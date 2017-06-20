class Mutations::UpdateSubscription < Mutations::Base
  def self.arguments(types)
    {
      subscription_id: !types.ID,
      trigger_id: types.ID,
      trigger_options: Types::ArbitraryObject,
      data_overrides: Types::ArbitraryObject,
    }
  end

  def self.description
  end

  def self.return_type
    !Types::Subscription
  end

  def execute
    subscription = Subscription.find(args[:subscription_id])

    trigger = Trigger.find_by(id: args[:trigger_id]) || subscription.trigger
    data_overrides = args[:data_overrides] || subscription.data_overrides

    subscription.update!(
      trigger: trigger,
      trigger_options: args[:trigger_options].presence || trigger.default_options,
      data_overrides: data_overrides
    )

    subscription
  end
end
