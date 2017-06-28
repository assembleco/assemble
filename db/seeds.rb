# Remove any data currently in the database

BlockRun.destroy_all
Block.destroy_all
SlackAuthentication.destroy_all
User.destroy_all
Service.destroy_all
Environment.destroy_all

user = User.create!(
  handle: "user",
  github_uid: "abc123",
  github_token: "abc123",
  email: "person@example.com",
)

github = Service.create!(name: "GitHub", domain: "github.com")
time = Service.create!(name: "Time-based", domain: "assembleapp.co")

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
  service: time,
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

darksky_schema = {
  type: :object,
  properties: {
    darksky_key: { type: :string },
    latitude: { type: :string },
    longitude: { type: :string }
  },
  required: [:darksky_key, :latitude, :longitude],
}
Block.create!(
  description: "This block connects to the Dark Sky API (https://darksky.net/) to pull the latest weather forecast information.",
  environment: ruby,
  name: "forecast",
  schema: darksky_schema,
  source: File.read("db/seeds/blocks/darksky.rb"),
  user: user,
)

pushover_schema = {
  type: :object,
  properties: {
    text: { type: :string },
    pushover: {
      type: :object,
      properties: {
        user_id: { type: :string },
        key: { type: :string }
      },
      required: [:user_id, :key]
    }
  },
  required: [:text, :pushover]
}
Block.create!(
  description: "Use Pushover (https://pushover.net/) to send a notification to a user's phone",
  environment: node,
  name: "phone_notification",
  schema: pushover_schema,
  source: File.read("db/seeds/blocks/pushover.js"),
  user: user,
)

transform_schema = {
  type: :object,
  required: [],
  properties: {
    "_transform" => {
      type: :object,
      required: [:source, :destination],
      properties: {
        source: {type: :string},
        destination: {type: :string},
      },
    },
  },
}
Block.create!(
  description: "Takes input data, and outputs the same data with some of the data renamed.",
  environment: ruby,
  name: "transform",
  schema: transform_schema,
  source: File.read("db/seeds/blocks/transform.rb"),
  user: user,
)
