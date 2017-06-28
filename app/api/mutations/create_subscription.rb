module Mutations
  class CreateSubscription < Mutations::Base
    def self.arguments(types)
      {
        block_id: types.ID,
        trigger_id: types.ID,
      }
    end

    def self.description
      "Subscribe a block to a trigger"
    end

    def self.return_type
      Types::Subscription
    end

    def execute
      person = context[:session]
      block = Block.find(args[:block_id])
      trigger = Trigger.find(args[:trigger_id])

      block.subscriptions.where(user: person).destroy_all

      subscription = Subscription.create!(
        block: block,
        trigger: trigger,
        user: person,
        trigger_options: trigger.default_options,
      )

      subscription
    end
  end
end
