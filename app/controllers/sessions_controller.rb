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
      create_slack_authentication

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

  def create_slack_authentication
    SlackAuthentication.create!(
      handle: auth_hash.fetch(:info).fetch(:user),
      team: auth_hash.fetch(:info).fetch(:team),
      slack_team_id: auth_hash.fetch(:info).fetch(:team_id),
      token: auth_hash.fetch(:credentials).fetch(:token),
      user: current_user,
      slack_user_id: auth_hash.fetch(:info).fetch(:user_id),
    )
  end

  def provider?(provider_id)
    params.fetch(:provider).to_s == provider_id.to_s
  end
end
