module TriggerStrategy
  module BitBucket
    class Push
      def initialize(subscription)
        @subscription = subscription
      end

      # Returns the remote webhook ID
      def activate
        raise NotImplementedError

        response = HTTParty.get(
          "https://api.bitbucket.org/2.0/repositories/#{repo}/hooks",
          headers: {
            "Authorization" => "Bearer #{subscription.authentication.credentials["token"]}"
          }
        )

        puts response.body, response.code, response.message, response.headers.inspect
      end

      def active?
        raise NotImplementedError
      end

      def deactivate(remote_webhook_id)
        raise NotImplementedError
      end

      # TODO: never call this method directly.
      # Instead, use `Subscription#record_event`.
      def record_event(payload)
        Event.create!(data: payload.as_json, subscription: subscription)
      end

      private

      def repo
        options.fetch(:repo)
      end

      def host
        ENV.fetch("APPLICATION_HOST")
      end

      def options
        subscription.trigger_options.with_indifferent_access
      end
    end
  end
end


=begin
curl \
  -X POST \
  -u credentials \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer OAUTH_TOKEN' \
  https://api.bitbucket.org/2.0/repositories/#{repo}/hooks
  -d '
    {
      "description": "Webhook Description",
      "url": "https://example.com/",
      "active": true,
      "events": [
        "repo:push",
        "issue:created",
        "issue:updated"
      ]
    }'

# To obtain a new access token from a refresh token
curl
  -X POST \
  -u "client_id:secret" \
  https://bitbucket.org/site/oauth2/access_token \
  -d grant_type=refresh_token \
  -d refresh_token={refresh_token}
=end
