Types::Trigger = GraphQL::ObjectType.define do
  name "Trigger"
  description "A known class of event that a service can publish via webhook"

  field :id, !types.ID
  field :name, !types.String
  field :description, !types.String
  field :options_schema, !Types::ArbitraryObject
  field :sample_data, !Types::ArbitraryObject
  field :service, !Types::Service
end
