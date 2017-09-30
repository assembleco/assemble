Queries = GraphQL::ObjectType.define do
  name "Query"
  description "The root of all queries"

  field :block do
    type Types::Block
    description "Look up a block by its id"
    argument :id, !types.ID
    resolve -> (obj, args, ctx) { Block.find(args[:id]) }
  end

  field :blocks do
    type types[Types::Block]
    description "A list of all blocks"
    resolve -> (obj, args, ctx) { Block.all }
  end

  field :credentialed_services do
    type types[Types::Service]
    description "A list of all third-party services that provide credentials to blocks"
    resolve -> (obj, args, ctx) { Service.where.not(oauth_provider: nil) }
  end

  field :triggers do
    type types[Types::Trigger]
    description "A list of all registered event triggers"
    resolve -> (obj, args, ctx) { Trigger.all }
  end

  field :session do
    type Types::Session
    description "The person who is logged in on this session"
    resolve -> (obj, args, ctx) { ctx[:session] }
  end
end
