class UsersController < ApplicationController
  def show
    @user = User.find_by(handle: params[:handle]) || current_user

    respond_to do |format|
      format.html
      format.json { render json: current_user.as_json }
    end
  end

  def edit
  end

  def update
    user = current_user

    if user.update(update_user_params)
      redirect_to user_path(user), notice: t(".success", name: user.handle)
    else
      render :edit, notice: t(".failure")
    end
  end

  private

  def update_user_params
    params.require(:user).permit(:bio, :location, :website)
  end

  def user_params
    params.require(:user).permit(:email, :password, :handle)
  end
end
