# frozen_string_literal: true

require "json"

class Run < ApplicationRecord
  belongs_to :flow

  validate :args_match_schema

  def execute
    image_dir = Rails.root.join("containers/flow-node").to_s
    image = Docker::Image.build_from_dir(image_dir)
    container = Docker::Container.create("Image" => image.id, "Tty" => true)
    container.start

    container.store_file("/flow/input.json", args)
    container.store_file("/flow/env.json", env_variables.to_json)
    container.store_file("/flow/user_script.js", flow.body)
    output, errors, self.exit_status = container.exec(["node", "/flow/user_script.js"])
    container.stop
    container.delete

    self.output = output.join
    self.run_errors = errors.join

    save
  end

  private

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
