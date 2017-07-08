module Mutations
  class DestroyAuthentication < Mutations::Base
    def self.arguments(types)
      {
        service_id: !types.ID,
      }
    end

    def self.description
      "Unauthenticate a service"
    end

    def self.return_type(types)
      Types::Service
    end

    def execute
      service = Service.find(args[:service_id])
      authentications = context[:session].authentications.where(service: service)
      authentications.destroy_all
      service
    end
  end
end
