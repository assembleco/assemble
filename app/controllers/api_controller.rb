class ApiController < ApplicationController
  skip_before_filter :verify_authenticity_token, only: [:query]

  def query
    result = Schema.execute(
      params[:query],
      variables: params[:variables],
      context: { session: current_user }
    )
    render json: result
  end
end

TimeType = GraphQL::ScalarType.define do
  name "Time"
  description "Time, represented in ISO 8601 (YYYY-MM-DDTHH:MM:SSZ)"

  coerce_input ->(value, ctx) { DateTime.parse(value) }
  coerce_result ->(value, ctx) { value.iso8601 }
end

ArbitraryObjectType = GraphQL::ScalarType.define do
  name "ArbitraryObject"
  description "Any JSON object with arbitrary keys"

  coerce_input ->(value, ctx) { value }
  coerce_result ->(value, ctx) { value }
end

PersonType = GraphQL::ObjectType.define do
  name "Person"
  description "A person who has registered an account with Assemble"

  field :id, !types.ID
  field :handle, !types.String
  field :email, types.String
end

ServiceType = GraphQL::ObjectType.define do
  name "Service"
  description "A third-party service that publishes webhook events"

  field :name, !types.String
  field :domain, !types.String
end

TriggerType = GraphQL::ObjectType.define do
  name "Trigger"
  description "A known class of event that a service can publish via webhook"

  field :id, !types.ID
  field :name, !types.String
  field :description, !types.String
  field :options_schema, !ArbitraryObjectType
  field :data_schema, !ArbitraryObjectType
  field :service, !ServiceType
end

BlockType = GraphQL::ObjectType.define do
  name "Block"
  description "A standalone, executable serverless function"

  field :active, !types.Boolean
  field :command, types.String
  field :created_at, !TimeType
  field :description, types.String
  field :dockerfile, types.String
  field :id, !types.ID
  field :name, types.String
  field :source, types.String
  field :source_path, types.String
  field :udpated_at, !TimeType
  field :schema, !ArbitraryObjectType

  field :author, !PersonType do
    resolve ->(obj, args, ctx) { obj.user }
  end

  field :editable, !types.Boolean do
    resolve ->(obj, args, ctx) { obj.user == ctx[:session] }
  end

  field :initial_input_data, !ArbitraryObjectType do
    resolve ->(obj, args, ctx) {
      obj.runs.where(user: ctx[:session]).last.try(:input) || {}
    }
  end

  field :subscription, SubscriptionType do
    resolve -> (obj, args, ctx) {
      obj.subscriptions.find_by(user: ctx[:session])
    }
  end
end

SessionType = GraphQL::ObjectType.define do
  name "Session"
  description "Information about the current user, as well as their credentials"

  field :api_key, !types.String

  field :person, !PersonType do
    resolve -> (obj, args, ctx) { obj }
  end
end

SubscriptionType = GraphQL::ObjectType.define do
  name "Subscription"
  description "The connection between a block and the web events it listens to"

  field :id, !types.ID
  field :block, !BlockType
  field :trigger_options, !ArbitraryObjectType
  field :trigger, !TriggerType
end

QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "The root of all queries"

  field :block do
    type BlockType
    description "Look up a block by its id"
    argument :id, !types.ID
    resolve -> (obj, args, ctx) { Block.find(args[:id]) }
  end

  field :blocks do
    type types[BlockType]
    description "A list of all blocks"
    resolve -> (obj, args, ctx) { Block.all }
  end

  field :services do
    type types[ServiceType]
    description "A list of all known third-party services"
    resolve -> (obj, args, ctx) { Service.all }
  end

  field :triggers do
    type types[TriggerType]
    description "A list of all registered event triggers"
    resolve -> (obj, args, ctx) { Trigger.all }
  end

  field :session do
    type SessionType
    description "The person who is logged in on this session"
    resolve -> (obj, args, ctx) { ctx[:session] }
  end
end

MutationRoot = GraphQL::ObjectType.define do
  name "Mutation"

  field :create_or_update_subscription, SubscriptionType do
    description "Create or update a block's subscription"
    argument :subscription_id, types.ID
    argument :block_id, types.ID
    argument :trigger_id, types.ID

    resolve ->(ob, args, ctx) {
      subscription = nil

      if(args[:subscription_id])
        subscription = Subscription.find(args[:subscription_id])

        subscription.update!(
          trigger: Trigger.find(args[:trigger_id]),
          trigger_options: args[:trigger_options] || {},
        )
      else
        subscription = Subscription.create!(
          block: Block.find(args[:block_id]),
          trigger: Trigger.find(args[:trigger_id]),
          user: ctx[:session],
          trigger_options: args[:trigger_options].presence || {},
        )
      end

      subscription
    }
  end

  field :activate_subscription, SubscriptionType do
    description "Activate a block's subscription"
    argument :subscription_id, !types.ID

    resolve -> (obj, args, ctx) {
      subscription = Subscription.find(args[:subscription_id])
      subscription.activate
      subscription
    }
  end

  field :deactivate_subscription, SubscriptionType do
    description "Deactivate a block's subscription"
    argument :subscription_id, !types.ID

    resolve ->(obj, args, ctx) {
      subscription = Subscription.find(args[:subscription_id])
      subscription.deactivate
      subscription
    }
  end

  field :destroy_subscription, SubscriptionType do
    argument :subscription_id, !types.ID

    resolve -> (ojb, args, ctx) {
      subscription = Subscription.find(args[:subscription_id])
      subscription.destroy
    }
  end
end

Schema = GraphQL::Schema.define do
  query QueryType
  mutation MutationRoot
end
