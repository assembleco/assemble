class SessionsController < ApplicationController
  skip_before_action :require_login, only: [:new, :create], raise: false

  def new
    redirect_to "/auth/github"
  end

  def create
    if provider?(:github)
      user = User.find_or_create_from_auth_hash(auth_hash)
      user.sync_email_with_github

      self.current_user = user

      flash[:notice] =  t(".success", name: user.handle)
      redirect_to :root
    elsif provider?(:slack)
      create_authentication(:slack)

      redirect_to :root
    end
  end

  def destroy
    self.current_user = nil
    render json: { status: :ok }
  end

  private

  def auth_hash
    request.env["omniauth.auth"]
  end

  def create_authentication(provider)
    raise NotImplementedError
  end

  def provider?(provider_id)
    params.fetch(:provider).to_s == provider_id.to_s
  end
end
