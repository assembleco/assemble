require "clockwork"
require "clockwork/database_events"
require_relative "../config/boot"
require_relative "../config/environment"

module Clockwork
  # required to enable database syncing support
  Clockwork.manager = DatabaseEvents::Manager.new

  sync_database_events model: RecurringEvent, every: 10.seconds do |task|
    # When we load the scheduled task,
    # we need to load the associated subscription
    # and create an event through it.
    task.subscription.record_event(nil)

    # The event should then trigger a delayed job to run the block.
  end
end
