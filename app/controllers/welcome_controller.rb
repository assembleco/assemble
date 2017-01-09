class WelcomeController < ApplicationController
  skip_before_action :require_login, only: [:index]
  before_action :redirect_to_explore_if_signed_in

  def index
  end

  private

  def redirect_to_explore_if_signed_in
    if current_user
      redirect_to explore_path
    end
  end
end
