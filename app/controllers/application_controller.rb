class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :require_login

  helper_method :current_user

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) ||
      authenticate_with_http_token { |token, _| User.find_by(api_key: token) }
  end

  def current_user=(user)
    session[:user_id] = user.try(:id)
  end

  def require_login
    unless current_user
      redirect_to new_session_path
    end
  end
end
