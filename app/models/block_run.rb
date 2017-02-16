# frozen_string_literal: true

require "json"

class BlockRun < ApplicationRecord
  INPUT_SCHEMA_NOT_SATISFIED = "input_schema_not_satisfied"

  belongs_to :app
  belongs_to :block

  def execute
    image = build_image

    container ||= Docker::Container.create(
      "Image" => image.id,
      "Tty" => true,
      "Env" => [
        "ASSEMBLE_BLOCK_NAME=#{block.user.handle}/#{block.name}",
        "ASSEMBLE_DIR=#{container_assemble_dir}",
      ]
    )
    run_in_container(container)

    save!
  end

  def build_image
    Dir.mktmpdir do |dir|
      begin
        `cd #{dir} && git clone https://github.com/#{block.github_repo}.git`
        dir = dir + "/" + block.github_repo.split("/").last
        Docker::Image.build_from_dir(dir)
      rescue Docker::Error::UnexpectedResponseError => e
        update(status: :build_failure)
        # TODO Save and report build failure
        nil
      end
    end
  end

  def run_in_container(container)
    if schema_satisfied?
      container.start

      container.store_file("#{container_assemble_dir}/input.json", input.to_json)

      stdout, stderr, self.exit_status = container.exec(
        ["/bin/sh", "-c", "cd #{block_workdir} && #{block_command}"]
      )

      begin
        container.stop

        self.output = JSON.parse(
          container.
          read_file("#{container_assemble_dir}/output.json").
          encode!('UTF-16', 'UTF-8')
        )

        container.delete
      rescue
      end

      self.stdout = stdout.join
      self.stderr = stderr.join

      save!
    else
      update!(status: BlockRun::INPUT_SCHEMA_NOT_SATISFIED)
    end
  end

  def exit_status=(value)
    super(value)

    if value == 0
      self.status = :success
    elsif value
      self.status = :failure
    end
  end

  private

  def block_command
    block_assemble_configuration[:block][:command]
  end

  def block_workdir
    block_assemble_configuration[:block][:workdir]
  end

  def block_assemble_configuration
    YAML.parse(
      Base64.decode64(
        Octokit.contents(
          block.github_repo,
          path: "assemble.yml",
        ).content
      )
    ).to_ruby.with_indifferent_access
  end

  def container_assemble_dir
    "/.assemble"
  end

  def schema_satisfied?
    JSON::Validator.validate(block.schema, input)
  end
end
