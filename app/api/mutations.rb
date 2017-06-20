Mutations = GraphQL::ObjectType.define do
  name "Mutation"

  field :create_subscription, Types::Subscription do
    description "Subscribe a block to a trigger"
    argument :block_id, types.ID
    argument :trigger_id, types.ID

    resolve ->(ob, args, ctx) {
      trigger = Trigger.find(args[:trigger_id])

      subscription = Subscription.create!(
        block: Block.find(args[:block_id]),
        trigger: trigger,
        user: ctx[:session],
        trigger_options: trigger.default_options,
      )

      subscription
    }
  end

  field :update_subscription, !Types::Subscription do
    argument :subscription_id, !types.ID
    argument :trigger_id, types.ID
    argument :trigger_options, Types::ArbitraryObject
    argument :data_overrides, Types::ArbitraryObject

    resolve -> (obj, args, ctx) {
      subscription = Subscription.find(args[:subscription_id])

      trigger = Trigger.find_by(id: args[:trigger_id]) || subscription.trigger
      data_overrides = args[:data_overrides] || subscription.data_overrides

      subscription.update!(
        trigger: trigger,
        trigger_options: args[:trigger_options].presence || trigger.default_options,
        data_overrides: data_overrides
      )

      subscription
    }
  end

  field :activate_subscription, Types::Subscription do
    description "Activate a block's subscription"
    argument :subscription_id, !types.ID

    resolve -> (obj, args, ctx) {
      subscription = Subscription.find(args[:subscription_id])

      subscription.activate
      subscription
    }
  end

  field :deactivate_subscription, Types::Subscription do
    description "Deactivate a block's subscription"
    argument :subscription_id, !types.ID

    resolve ->(obj, args, ctx) {
      subscription = Subscription.find(args[:subscription_id])
      subscription.deactivate
      subscription
    }
  end

  field :destroy_subscription, Types::Subscription do
    argument :subscription_id, !types.ID

    resolve -> (ojb, args, ctx) {
      subscription = Subscription.find(args[:subscription_id])
      subscription.destroy
    }
  end
end
