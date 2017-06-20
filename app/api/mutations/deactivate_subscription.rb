class Mutations::DeactivateSubscription < Mutations::Base
  def self.arguments(types)
    {
      subscription_id: !types.ID,
    }
  end

  def self.description
    "Deactivate a block's subscription"
  end

  def self.return_type
    !Types::Subscription
  end

  def execute
    subscription = Subscription.find(args[:subscription_id])
    subscription.deactivate
    subscription
  end
end
