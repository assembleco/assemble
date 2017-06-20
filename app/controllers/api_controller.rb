class ApiController < ApplicationController
  skip_before_filter :verify_authenticity_token, only: [:query]
  skip_before_filter :require_login

  def query
    result = Schema.execute(
      params[:query],
      variables: params[:variables],
      context: { session: current_user }
    )
    render json: result
  end
end
