class Mutations::CreateSubscription < Mutations::Base
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
    trigger = Trigger.find(args[:trigger_id])

    subscription = Subscription.create!(
      block: Block.find(args[:block_id]),
      trigger: trigger,
      user: context[:session],
      trigger_options: trigger.default_options,
    )

    subscription
  end
end
