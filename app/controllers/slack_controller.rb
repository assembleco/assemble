class SlackController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:slash]
  skip_before_action :require_login, only: [:slash]

  def slash
    with_authenticated_slack_message do |user|
      block_name = params[:text].split(" ").first

      render json: {
        response_type: "ephemeral",
        text: "Received message: '#{params[:text]}'",
      }
    end
  end

  private

  def with_authenticated_slack_message
    if(params[:token] == ENV.fetch("SLACK_VERIFICATION_TOKEN"))
      service = Service.find_by!(name: "slack")
      connection = service.connections.find_by!(service_user_id: params[:user_id])
      user = connection.user

      yield user
    else
      render json: { error: "Invalid verification token" }, status: 401
    end
  end
end
