class InvalidSignature < StandardError; end

class WebhookEventsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  skip_before_action :require_login, only: [:create]

  def create
    subscription = Subscription.find_by!(
      remote_webhook_id: params[:webhook_event][:hook][:id],
    )

    body = request.body
    digest = OpenSSL::Digest.new("sha1")
    secret = ENV.fetch("GITHUB_SIGNATURE_SECRET")
    hmac = OpenSSL::HMAC.hexdigest(digest, secret, body.read)

    signature = request.headers["X-Hub-Signature"]

    if "sha1=#{hmac}" == signature
      subscription.record_event(params)
    else
      raise InvalidSignature, "expected #{signature}, got #{hmac}"
    end
  end
end
