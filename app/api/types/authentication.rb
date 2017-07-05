Types::Authentication = GraphQL::ObjectType.define do
  name "Authentication"
  description "A connection to a third-party service"

  field :id, !types.ID

  field :person, !Types::Person
  field :service, !Types::Service
  field :created_at, !Types::Time
end
