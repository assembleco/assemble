class AppsController < ApplicationController
  def show
    @app = App.find_by!(user: user, name: params[:appname])
  end

  private

  def user
    @user ||= User.find_by!(username: params[:username])
  end
end
