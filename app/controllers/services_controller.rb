class ServicesController < ApplicationController
  def index
    @connections = {
      slack: current_user.slack_authentications,
      github: [current_user],
    }

    react_component(
      "ServiceIndex",
      slack_connections: @connections[:slack].as_json,
      github_connections: @connections[:github].as_json,
    )
  end
end
