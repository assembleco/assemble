class Mutations::DestroySubscription < Mutations::Base
  def self.arguments(types)
    {
      subscription_id: !types.ID,
    }
  end

  def self.description
  end

  def self.return_type(types)
    Types::Subscription
  end

  def execute
    subscription = Subscription.find(args[:subscription_id])
    subscription.destroy
  end
end
