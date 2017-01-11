class SandboxAppsController < ApplicationController
  # If the sandbox app does not exist for the given block, create it
  def show
    app_name = "Sandbox app: #{block.name}"
    @app = App.find_by(name: app_name, user: current_user)

    if @app.nil?
      @app = App.create!(name: app_name, user: current_user)

      # Create an entrypoint for the sandbox
      trigger = Trigger.create!(name: "Sandbox form: #{block.name}", schema: block.schema)
      Connection.create!(app: @app, source: trigger, destination: block)
    end
  end

  private

  def block
    Block.find_by!(user: block_user, name: params[:blockname])
  end

  def block_user
    User.find_by!(username: params[:username])
  end
end
