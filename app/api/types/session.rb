Types::Session = GraphQL::ObjectType.define do
  name "Session"
  description "Information about the current user, as well as their credentials"

  field :api_key, !types.String

  field :person, !Types::Person do
    resolve -> (obj, args, ctx) { obj }
  end
end
