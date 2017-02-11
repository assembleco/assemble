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
      "Env" => ["ASSEMBLE_BLOCK_NAME=#{block.user.username}/#{block.name}"]
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
        self.status = :build_failure
        nil
      end
    end
  end

  def run_in_container(container)
    if schema_satisfied?
      container.start

      workdir = "/assemble"
      container.store_file("#{workdir}/input.json", input.to_json)

      command = "bundle exec ruby script.rb"

      stdout, stderr, self.exit_status = container.exec(
        ["/bin/sh", "-c", "cd #{workdir} && #{command}"]
      )

      begin
        container.stop

        self.output = JSON.parse(
          container.
          read_file("#{workdir}/output.json").
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

  def schema_satisfied?
    JSON::Validator.validate(block.schema, input)
  end
end
