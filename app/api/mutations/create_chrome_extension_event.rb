module Mutations
  class CreateChromeExtensionEvent < Mutations::Base
    def self.arguments(types)
      {
        extension_uuid: !types.String,
        data: !Types::ArbitraryObject,
      }
    end

    def self.description
      "Record an event for a trigger"
    end

    def self.return_type(types)
      !types[Types::Event]
    end

    def execute
      service = Service.find_by!(domain: "assembleapp.co")
      trigger = service.triggers.find_by(name: "Chrome extension")

      subscriptions = trigger.subscriptions.select do |sub|
        sub.trigger_options["extension_uuid"] == args[:extension_uuid]
      end

      puts "Executing. Located #{subscriptions.count} subscriptions matching #{args[:extension_uuid]}"
      subscriptions.map do |sub|
        sub.record_event(args[:data])
      end
    end
  end
end
