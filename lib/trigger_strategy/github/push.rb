module TriggerStrategy
  module GitHub
    class Push
      def initialize(subscription)
        @subscription = subscription
      end

      attr_reader :subscription

      # Returns the remote webhook ID
      def activate
        response = github_client.create_hook(
          repo,
          "web",
          {
            url: "https://#{host}/webhook/github",
            content_type: "json",
            secret: github_signature_secret,
          },
          {
            events: ["push"],
            active: true,
          }
        )

        response[:id]
      end

      def active?
        github_client.hooks("assembleapp/registry").any?
      end

      def deactivate(remote_webhook_id)
        github_client.remove_hook(repo, remote_webhook_id)
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

      def github_client
        Octokit::Client.new(access_token: subscription.user.github_token)
      end

      def host
        ENV.fetch("APPLICATION_HOST")
      end

      def github_signature_secret
        ENV.fetch("GITHUB_SIGNATURE_SECRET")
      end

      def options
        subscription.trigger_options.with_indifferent_access
      end
    end
  end
end
