class AppsController < ApplicationController
  helper_method :user

  def index
    @apps = user.apps
  end

  def show
    @app = App.find_by!(user: user, name: params[:appname])
  end

  private

  def user
    @user ||= User.find_by!(username: params[:username])
  end
end
