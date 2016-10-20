require 'docker'

class ScriptsController < ApplicationController
  def new
    @script = Script.new
    @output = ""
  end

  def create
    @script = Script.new(body: params.require(:script).permit(:body)[:body])

    container = Docker::Container.create('Image' => 'node:4', 'Tty' => true)
    container.start
    container.store_file("/script/entry.js", <<-JS)
    main = require('./script')
    console.log(
    main(#{"Maggie".inspect})
    );
    JS
    container.store_file("/script/script.js", @script.body)
    @output = container.exec(['node', '/script/entry.js'])
    container.stop

    render :new
  end
end
