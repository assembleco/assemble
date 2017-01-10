class AppsController < ApplicationController
  helper_method :user

  def index
    @apps = user.apps
  end

  def show
    @app = App.find_by!(user: user, name: params[:appname])
  end

  def new
    @app = App.new(user: current_user)
  end

  def create
    @app = App.new(app_params)

    if @app.save
      redirect_to app_path(@app.user, @app), notice: t(".success")
    else
      flash.now[:alert] = t(".failure")
      render :new
    end
  end

  private

  def user
    @user ||= User.find_by!(username: params[:username])
  end

  def app_params
    params.require(:app).permit(:name, :description).merge(user: current_user)
  end
end
