require "rufus-scheduler"

schedule = Rufus::Scheduler.singleton

# only schedule when not running from the Ruby on Rails console
# or from a rake task
unless defined?(Rails::Console) ||
  File.split($0).last == "rake" ||
  Rails.env.test?

  # Every week
  schedule.cron "0 0 * * 0" do
    Rails.logger.info "Running weekly job at #{Time.now}"
    Rails.logger.flush
    Event.create(feed: Feed.find_by!(name: "Every Week"), data: { time: Time.now })
  end

  # Every day at midnight
  schedule.cron "0 0 * * *" do
    Rails.logger.info "Running daily job at #{Time.now}"
    Rails.logger.flush
    Event.create(feed: Feed.find_by!(name: "Every Day"), data: { time: Time.now })
  end

  # Every hour on the hour
  schedule.cron "0 * * * *" do
    Rails.logger.info "Running hourly job at #{Time.now}"
    Rails.logger.flush
    Event.create(feed: Feed.find_by!(name: "Every Hour"), data: { time: Time.now })
  end

  # Every minute on the minute
  schedule.cron "* * * * *" do
    Rails.logger.info "Running minutely job at #{Time.now}"
    Rails.logger.flush
    Event.create(feed: Feed.find_by!(name: "Every Minute"), data: { time: Time.now })
  end
end
