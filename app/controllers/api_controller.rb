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
  field :email, !types.String
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

  field :event_settings, !ArbitraryObjectType
end

SessionType = GraphQL::ObjectType.define do
  name "Session"
  description "Information about the current user, as well as their credentials"

  field :api_key, !types.String

  field :person, !PersonType do
    resolve -> (obj, args, ctx) { obj }
  end
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

  field :session do
    type SessionType
    description "The person who is logged in on this session"
    resolve -> (obj, args, ctx) { ctx[:session] }
  end
end

Schema = GraphQL::Schema.define do
  query QueryType
end
