class SessionsController < ApplicationController
  skip_before_action :require_login, only: [:new, :create], raise: false

  def new
    redirect_to "/auth/github"
  end

  def create
    user = User.find_or_create_from_auth_hash(auth_hash)
    user.sync_email_with_github

    self.current_user = user

    flash[:notice] =  t(".success", name: user.handle)
    redirect_to :root
  end

  def destroy
    self.current_user = nil
    render json: { status: :ok }
  end

  private

  def auth_hash
    request.env["omniauth.auth"]
  end
end
