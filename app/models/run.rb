# frozen_string_literal: true

require "json"

class Run
  include ActiveModel::Model

  attr_accessor :flow, :args
  attr_reader :output, :errors, :exit_status

  def save
    image_dir = Rails.root.join("containers/flow-node").to_s
    image = Docker::Image.build_from_dir(image_dir)
    container = Docker::Container.create("Image" => image.id, "Tty" => true)
    container.start

    puts "ARGS: #{args.to_json}"
    container.store_file("/flow/input.json", args.to_json)
    container.store_file("/flow/user_script.js", flow.body)
    output, errors, @exit_status = container.exec(["node", "/flow/user_script.js"])
    container.stop
    container.delete

    @output = output.join
    @errors = errors.join

    exit_status == 0
  end
end
