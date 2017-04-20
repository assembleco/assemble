class ApplicationController < ActionController::Base
  include ActionView::Helpers::TagHelper

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

  def react_component(name, props = {}, options = {}, &block)
    html_options = options.reverse_merge(data: {
      react_class: name,
      react_props: (props.is_a?(String) ? props : props.to_json)
    })

    render inline: content_tag(:div, '', html_options, &block), layout: :default
  end

  def require_login
    unless current_user
      redirect_to new_session_path
    end
  end
end
