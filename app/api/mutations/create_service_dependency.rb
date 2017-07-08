module Mutations
  class CreateServiceDependency < Mutations::Base
    def self.arguments(types)
      {
        block_id: !types.ID,
        service_id: !types.ID,
      }
    end

    def self.description
      "Mark that a block depends on credentials from a service"
    end

    def self.return_type(types)
      Types::ServiceDependency
    end

    def execute
      ServiceDependency.create!(
        block: Block.find(args[:block_id]),
        service: Service.find(args[:service_id]),
      )
    end
  end
end
