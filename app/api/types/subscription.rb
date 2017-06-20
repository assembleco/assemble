Types::Subscription = GraphQL::ObjectType.define do
  name "Subscription"
  description "The connection between a block and the web events it listens to"

  field :id, !types.ID

  field :active, !types.Boolean do
    resolve -> (obj, args, ctx) { !!obj.active? }
  end

  field :block, !Types::Block
  field :trigger_options, !Types::ArbitraryObject
  field :trigger, !Types::Trigger
  field :data_overrides, !Types::ArbitraryObject
end
