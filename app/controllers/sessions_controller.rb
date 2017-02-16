class SessionsController < ApplicationController
  skip_before_action :require_login, only: [:new, :create], raise: false

  def new
    redirect_to "/auth/github"
  end

  def create
    user = User.find_or_create_from_auth_hash(auth_hash)
    self.current_user = user
    redirect_to explore_path, notice: t(".success", name: user.handle)
  end

  def destroy
    self.current_user = nil
    redirect_to root_path
  end

  private

  def auth_hash
    request.env["omniauth.auth"]
  end
end
