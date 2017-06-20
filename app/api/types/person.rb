Types::Person = GraphQL::ObjectType.define do
  name "Person"
  description "A person who has registered an account with Assemble"

  field :id, !types.ID
  field :handle, !types.String
  field :email, types.String
end
