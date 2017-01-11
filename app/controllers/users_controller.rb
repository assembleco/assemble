class UsersController < ApplicationController
  skip_before_action :require_login, only: [:new, :create], raise: false

  def show
    @user = User.find_by!(username: params[:username])
  end

  def new
    @user = User.new
  end

  def create
    @user = sign_up(user_params)

    if @user.valid?
      sign_in(@user)
      redirect_to explore_path, notice: t(".success", name: @user.username)
    else
      render :new
    end
  end

  def edit
  end

  def update
    user = current_user

    if user.update(update_user_params)
      redirect_to user_path(user), notice: t(".success", name: user.username)
    else
      render :edit, notice: t(".failure")
    end
  end

  private

  def update_user_params
    params.require(:user).permit(:bio, :location, :website)
  end

  def user_params
    params.require(:user).permit(:email, :password, :username)
  end
end
