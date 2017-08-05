# Remove any data currently in the database

BlockRun.destroy_all
Block.destroy_all
User.destroy_all
Service.destroy_all
Environment.destroy_all

user = User.create!(
  handle: "user",
  github_uid: "abc123",
  github_token: "abc123",
  email: "person@example.com",
)

assemble = Service.create!(name: "Assemble", domain: "assembleapp.co")
github = Service.create!(name: "GitHub", domain: "github.com")

google = Service.create!(
  name: "Google",
  domain: "google.com",
  oauth_provider: "google_oauth2",
)

trigger_schema = {
  type: :object,
  properties: {
    extension_uuid: { type: :string },
  },
  required: [:extension_uuid]
}
Trigger.create!(
  service: assemble,
  name: "Chrome extension",
  description: "Run whenever you click the Chrome extension button",
  options_schema: trigger_schema,
  default_options: { extension_uuid: "aaaa-bbbbb-ccccc-ddddd-eeee" },
  sample_data: { url: "http://example.com", html: "<html>Hello!</html>" },
)

trigger_schema = {
  type: :object,
  properties: {
    repo: { type: :string },
  },
  required: [:repo]
}
Trigger.create!(
  service: github,
  name: "Push",
  description: "New commits pushed to the GitHub repository",
  options_schema: trigger_schema,
  default_options: { repo: "assembleapp/registry" },
  sample_data: {
    ref: "string",
    head: "string",
    before: "string",
    size: 123,
    distinct_size: 123,
    commits: [{
      sha: "string",
      message: "string",
      author: {
        name: "string",
        email: "string",
      },
      url: "string",
      distinct: true,
    }]
  }
)

trigger_schema = {
  type: :object,
  properties: {
    frequency_quantity: { type: :integer },
    frequency_unit: { type: :string },
    at: { type: :string },
  },
  required: [:frequency_quantity, :frequency_unit]
}
Trigger.create!(
  service: assemble,
  name: "Recurring",
  description: "Run this block repeatedly at a certain time interval",
  options_schema: trigger_schema,
  default_options: {
    frequency_quantity: 1,
    frequency_unit: "day",
  },
)

ruby = Environment.create!(
  name: "ruby",
  command: "ruby /app/script.rb",
  dockerfile: "FROM ruby:latest\n",
  source_path: "/app/script.rb",
)
node = Environment.create!(
  name: "node",
  command: "node /app/script.js",
  dockerfile: "FROM node:latest\n",
  source_path: "/app/script.js",
)

Block.create!(
  description: "Simply prints out the input that was passed to the flow.",
  environment: ruby,
  name: "debug",
  source: File.read("db/seeds/blocks/debug.rb"),
  user: user,
)

Block.create!(
  description: "This block connects to the Dark Sky API (https://darksky.net/) to pull the latest weather forecast information.",
  environment: ruby,
  name: "forecast",
  source: File.read("db/seeds/blocks/darksky.rb"),
  user: user,
)

Block.create!(
  description: "Use Pushover (https://pushover.net/) to send a notification to a user's phone",
  environment: node,
  name: "phone_notification",
  source: File.read("db/seeds/blocks/pushover.js"),
  user: user,
)

Block.create!(
  description: "Takes input data, and outputs the same data with some of the data renamed.",
  environment: ruby,
  name: "transform",
  source: File.read("db/seeds/blocks/transform.rb"),
  user: user,
)
