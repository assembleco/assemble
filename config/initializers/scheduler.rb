require "rufus-scheduler"

schedule = Rufus::Scheduler.singleton

# only schedule when not running from the Ruby on Rails console
# or from a rake task
unless defined?(Rails::Console) ||
  File.split($0).last == "rake" ||
  Rails.env.test?

  # Define tasks here - see Rufus::Scheduler docs
end
