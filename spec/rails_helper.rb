ENV["RACK_ENV"] = "test"

require File.expand_path("../../config/environment", __FILE__)
abort("DATABASE_URL environment variable is set") if ENV["DATABASE_URL"]

require "rspec/rails"
require "capybara/poltergeist"

Dir[Rails.root.join("spec/support/**/*.rb")].sort.each { |file| require file }

module Features
  # Extend this module in spec/support/features/*.rb
  include Formulaic::Dsl

  def stub_authentication(user)
    OmniAuth.config.mock_auth[:github] = OmniAuth::AuthHash.new(
      "credentials" => {
        "token" => user.github_token,
      },
      "info" => {
        "nickname" => user.handle,
      },
      "uid" => user.github_uid,
    )
  end

  def sign_in(user)
    stub_authentication(user)
    visit "/auth/github"
  end
end

RSpec.configure do |config|
  config.filter_rails_from_backtrace!

  config.include Features, type: :feature
  config.infer_base_class_for_anonymous_controllers = false
  config.infer_spec_type_from_file_location!
  config.use_transactional_fixtures = false
end

OmniAuth.config.test_mode = true

ActiveRecord::Migration.maintain_test_schema!

Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(
    app,
    js_errors: true,
    url_whitelist: [],
  )
end

Capybara.javascript_driver = :poltergeist
