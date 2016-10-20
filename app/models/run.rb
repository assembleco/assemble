# frozen_string_literal: true

class Run
  include ActiveModel::Model

  attr_accessor :flow
  attr_reader :output

  def save
    container = Docker::Container.create("Image" => "node:4", "Tty" => true)
    container.start

    arg_list = args.map(&:inspect).join(", ")

    container.store_file("/flow/entry.js", <<-JS)
    main = require("./flow")
    console.log(
    main(#{arg_list})
    );
    JS

    container.store_file("/flow/flow.js", flow.body)
    @output = container.exec(["node", "/flow/entry.js"])
    container.stop

    true
  end

  def args
    @args || []
  end

  def args=(value)
    @args = value.split(",")
  end
end
