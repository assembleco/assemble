# frozen_string_literal: true

require "json"

class Run < ApplicationRecord
  INPUT_SCHEMA_NOT_SATISFIED = "input_schema_not_satisfied"

  belongs_to :block
  has_one :user, through: :block

  ENVIRONMENT_COMMANDS = {
    "node" => "node",
    "ruby" => "ruby",
    "python2" => "python",
    "git" => "source",
  }.freeze

  def execute
    if schema_satisfied?
      container.start

      container.store_file("/flow/config.json", config.to_json)
      container.store_file("/flow/input.json", args)
      container.store_file("/flow/env.json", env_variables.to_json)
      container.store_file("/flow/user_script.js", block.body)

      output, errors, self.exit_status = container.exec([
        ENVIRONMENT_COMMANDS[block.environment],
        "/flow/user_script.js",
      ])

      container.stop
      container.delete

      self.output = output.join
      self.run_errors = errors.join

      save!
    else
      update!(status: Run::INPUT_SCHEMA_NOT_SATISFIED)
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
    @container ||=
      begin
        image_dir = Rails.root.join("containers/#{block.environment}").to_s
        image = Docker::Image.build_from_dir(image_dir)
        Docker::Container.create("Image" => image.id, "Tty" => true)
      end
  end

  def config
    {
      host: ENV.fetch("APPLICATION_HOST"),
    }
  end

  def env_variables
    block.env_variables.pluck(:key, :value).to_h
  end

  def schema_satisfied?
    schema = JSON.parse(block.schema)
    JSON::Validator.validate(schema, args)
  end
end
