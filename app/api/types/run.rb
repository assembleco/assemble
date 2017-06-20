Types::Run = GraphQL::ObjectType.define do
  name "Run"
  description "A single execution of a block"

  field :id, !types.ID
  field :block, !Types::Block
  field :exit_status, types.Int
  field :stdout, types.String
  field :stderr, types.String
  field :created_at, !Types::Time
  field :updated_at, !Types::Time
  field :status, !types.String
  field :input, Types::ArbitraryObject
  field :output, Types::ArbitraryObject
  field :user, !Types::Person
  field :event, Types::Event
end
