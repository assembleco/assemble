class AboutController < ApplicationController
  skip_before_action :require_login, only: [:index]

  def index
    render html: "", layout: true
  end
end
