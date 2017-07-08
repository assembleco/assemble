module TriggerStrategy
  module Assemble
    class ChromeExtension
      def initialize(subscription)
        @subscription = subscription
      end

      attr_reader :subscription

      def activate
      end

      def active?
      end

      def deactivate(remote_webhook_id)
      end

      # TODO: never call this method directly.
      # Instead, use `Subscription#record_event`.
      def record_event(payload)
        Event.create!(subscription: subscription, data: payload)
      end

      private

      def options
        subscription.trigger_options.with_indifferent_access
      end
    end
  end
end
