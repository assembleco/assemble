# frozen_string_literal: true

require "json"

class Run
  include ActiveModel::Model
  include ActiveModel::Validations

  attr_accessor :flow, :args
  attr_reader :output, :flow_errors, :exit_status

  validate :args_match_schema

  def save
    image_dir = Rails.root.join("containers/flow-node").to_s
    image = Docker::Image.build_from_dir(image_dir)
    container = Docker::Container.create("Image" => image.id, "Tty" => true)
    container.start

    container.store_file("/flow/input.json", args.to_json)
    container.store_file("/flow/env.json", env_variables.to_json)
    container.store_file("/flow/user_script.js", flow.body)
    output, errors, @exit_status = container.exec(["node", "/flow/user_script.js"])
    container.stop
    container.delete

    @output = output.join
    @flow_errors = errors.join

    exit_status == 0
  end

  private

  def env_variables
    flow.env_variables.pluck(:key, :value).to_h
  end

  def args_match_schema
    schema = JSON.parse(flow.schema)
    data = args

    unless JSON::Validator.validate(schema, data)
      errors.add(:args, "do not match schema")
    end
  end
end
