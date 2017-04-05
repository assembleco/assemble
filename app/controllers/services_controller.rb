class ServicesController < ApplicationController
  def index
    @connections = {
      slack: current_user.slack_authentications,
      github: [current_user],
    }
  end
end
