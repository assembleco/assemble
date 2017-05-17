# Remove any data currently in the database

BlockRun.destroy_all
Block.destroy_all
Feed.destroy_all
SlackAuthentication.destroy_all
User.destroy_all

user = User.create!(handle: "user", github_uid: "abc123", github_token: "abc123")

Block.create!(
  command: "ruby /app/debug.rb",
  description: "Simply prints out the input that was passed to the flow.",
  dockerfile: "FROM ruby:latest\n",
  name: "debug",
  source: File.read("db/seeds/blocks/debug.rb"),
  source_path: "/app/debug.rb",
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
  command: "ruby /app/darksky.rb",
  description: "This block connects to the Dark Sky API (https://darksky.net/) to pull the latest weather forecast information.",
  dockerfile: "FROM ruby:latest\n",
  name: "forecast",
  schema: darksky_schema,
  source: File.read("db/seeds/blocks/darksky.rb"),
  source_path: "/app/darksky.rb",
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
  command: "node /app/pushover.js",
  description: "Use Pushover (https://pushover.net/) to send a notification to a user's phone",
  dockerfile: "FROM node:latest\n",
  name: "phone_notification",
  schema: pushover_schema,
  source: File.read("db/seeds/blocks/pushover.js"),
  source_path: "/app/pushover.js",
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
  command: "ruby /app/transform.rb",
  description: "Takes input data, and outputs the same data with some of the data renamed.",
  dockerfile: "FROM ruby:latest\n",
  name: "transform",
  schema: transform_schema,
  source: File.read("db/seeds/blocks/transform.rb"),
  source_path: "/app/transform.rb",
  user: user,
)

# Create time-based feeds
time_based_schema = {
  type: :object,
  properties: {
    time: { type: :string },
  },
  required: [:time],
}

Feed.create!(name: "Every Week", schema: time_based_schema)
Feed.create!(name: "Every Day", schema: time_based_schema)
Feed.create!(name: "Every Hour", schema: time_based_schema)
Feed.create!(name: "Every Minute", schema: time_based_schema)
