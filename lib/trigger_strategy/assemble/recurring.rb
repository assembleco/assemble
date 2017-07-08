module TriggerStrategy
  module Assemble
    class Recurring
      def initialize(subscription)
        @subscription = subscription
      end

      attr_reader :subscription

      # Returns the remote webhook ID
      def activate
        RecurringEvent.create!(
          # TODO use actual trigger options
          frequency_quantity: 1,
          frequency_unit: "minute",
          subscription: subscription,
        )
      end

      def active?
        RecurringEvent.where(subscription: subscription).any?
      end

      def deactivate(remote_webhook_id)
        RecurringEvent.where(subscription: subscription).destroy_all
      end

      # TODO: never call this method directly.
      # Instead, use `Subscription#record_event`.
      def record_event(payload)
        Event.create!(data: { time: Time.current }, subscription: subscription)
      end

      private

      def options
        subscription.trigger_options.with_indifferent_access
      end
    end
  end
end
