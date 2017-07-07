Types::Block = GraphQL::ObjectType.define do
  name "Block"
  description "A standalone, executable serverless function"

  field :active, !types.Boolean
  field :created_at, !Types::Time
  field :description, types.String
  field :environment, !Types::Environment
  field :id, !types.ID
  field :name, types.String
  field :source, types.String
  field :udpated_at, !Types::Time
  field :schema, !Types::ArbitraryObject

  field :author, !Types::Person do
    resolve ->(obj, args, ctx) { obj.user }
  end

  field :service_dependencies, !types[Types::ServiceDependency]

  field :editable, !types.Boolean do
    resolve ->(obj, args, ctx) { obj.user == ctx[:session] }
  end

  field :initial_input_data, !Types::ArbitraryObject do
    resolve ->(obj, args, ctx) {
      obj.runs.where(user: ctx[:session], event: nil).last.try(:input) || {}
    }
  end

  field :runs, types[Types::Run] do
    resolve -> (obj, args, ctx) {
      obj.runs.where(user: ctx[:session])
    }
  end

  field :subscription, Types::Subscription do
    resolve -> (obj, args, ctx) {
      obj.subscriptions.find_by(user: ctx[:session])
    }
  end
end
