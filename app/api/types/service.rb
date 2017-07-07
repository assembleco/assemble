Types::Service = GraphQL::ObjectType.define do
  name "Service"
  description "A third-party service that publishes webhook events"

  field :id, !types.ID
  field :name, !types.String
  field :domain, !types.String
  field :oauth_provider, types.String
end
