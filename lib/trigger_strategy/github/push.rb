module TriggerStrategy
  module GitHub
    class Push
      def initialize(authentication, options)
        @authentication = authentication
        @options = options.with_indifferent_access
      end

      attr_reader :authentication, :options

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

      def record_event(payload, subscription)
        Event.create!(data: payload.as_json, subscription: subscription)
      end

      private

      def repo
        options.fetch(:repo)
      end

      def github_client
        Octokit::Client.new(access_token: authentication.github_token)
      end

      def host
        ENV.fetch("APPLICATION_HOST")
      end

      def github_signature_secret
        ENV.fetch("GITHUB_SIGNATURE_SECRET")
      end
    end
  end
end
