Types::ServiceDependency = GraphQL::ObjectType.define do
  name "ServiceDependency"
  description "A relationship between a block and the third-party services it depends on"

  field :id, !types.ID
  field :block, !Types::Block
  field :service, !Types::Service
  field :credential_mapping, !Types::ArbitraryObject

  field :authenticated, !types.Boolean do
    resolve ->(obj, args, ctx) {
      ctx[:session].authentications.exists?(service: obj.service)
    }
  end
end
