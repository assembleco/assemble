# frozen_string_literal: true

require "json"

class BlockRun < ApplicationRecord
  INPUT_SCHEMA_NOT_SATISFIED = "input_schema_not_satisfied"

  belongs_to :app
  belongs_to :block

  validates :app, presence: true

  ENVIRONMENT_COMMANDS = {
    "node" => "node",
    "ruby" => "ruby",
    "python2" => "python",
  }.freeze

  def execute
    if schema_satisfied?
      container.start

      workdir = "/flow"
      container.store_file("#{workdir}/input.json", input.to_json)
      container.store_file("#{workdir}/user_script", block.body)

      command = [
        ENVIRONMENT_COMMANDS[block.environment],
        "#{workdir}/user_script",
      ].join(" ")

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

      run_connected_blocks
    else
      update!(status: BlockRun::INPUT_SCHEMA_NOT_SATISFIED)
    end
  end

  def run_connected_blocks
    app.blocks_connected_to(block).each do |block|
      app.queue_block_run(block, output)
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

  def container
    @container ||= Docker::Container.create(
      "Image" => block.environment,
      "Tty" => true,
    )
  end

  def schema_satisfied?
    JSON::Validator.validate(block.schema, input)
  end
end
