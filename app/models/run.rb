# frozen_string_literal: true

require "json"

class Run < ApplicationRecord
  belongs_to :flow
  has_one :user, through: :flow

  validate :args_match_schema

  ENVIRONMENT_COMMANDS = {
    "node" => "node",
    "ruby" => "ruby",
    "python2" => "python",
  }.freeze

  def execute
    container.start

    container.store_file("/flow/config.json", config.to_json)
    container.store_file("/flow/input.json", args)
    container.store_file("/flow/env.json", env_variables.to_json)
    container.store_file("/flow/user_script.js", flow.body)

    output, errors, self.exit_status = container.exec([
      ENVIRONMENT_COMMANDS[flow.environment],
      "/flow/user_script.js",
    ])

    container.stop
    container.delete

    self.output = output.join
    self.run_errors = errors.join

    save
  end

  def status
    if exit_status.zero?
      :success
    else
      :failure
    end
  end

  private

  def container
    @container ||=
      begin
        image_dir = Rails.root.join("containers/#{flow.environment}").to_s
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
    flow.env_variables.pluck(:key, :value).to_h
  end

  def args_match_schema
    schema = JSON.parse(flow.schema)

    unless JSON::Validator.validate(schema, args)
      errors.add(:args, "do not match schema")
    end
  end
end
