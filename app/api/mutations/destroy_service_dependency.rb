module Mutations
  class DestroyServiceDependency < Mutations::Base
    def self.arguments(types)
      {
        id: !types.ID,
      }
    end

    def self.description
      "Remove a block's dependency on credentials from a service"
    end

    def self.return_type
      Types::ServiceDependency
    end

    def execute
      ServiceDependency.find(args[:id]).destroy
    end
  end
end
