Types::Event = GraphQL::ObjectType.define do
  name "Event"
  description "A webhook-fired event from a third-party service"

  field :id, !types.ID
  field :data, !Types::ArbitraryObject
  field :subscription, !Types::Subscription
  field :created_at, !Types::Time
end
