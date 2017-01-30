# Remove any data currently in the database

EnvVariable.destroy_all
BlockRun.destroy_all
Block.destroy_all
Event.destroy_all
Subscription.destroy_all
Feed.destroy_all
App.destroy_all
User.destroy_all

user = User.create!(username: "user", password: "password", email: "user@example.com")

Block.create!(
  name: "Debug input",
  description: "Simply prints out the input that was passed to the flow.",
  environment: "ruby",
  user: user,
  body: File.read("db/seeds/blocks/debug.rb"),
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
  name: "Get the weather forecast from DarkSky",
  description: "This block connects to the Dark Sky API (https://darksky.net/) to pull the latest weather forecast information.",
  environment: "ruby",
  schema: darksky_schema,
  user: user,
  body: File.read("db/seeds/blocks/darksky.rb"),
)

# TODO create default values for DarkSky block: Lat & Long for OAK, CA

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
  name: "Send a phone notification via Pushover",
  description: "Use Pushover (https://pushover.net/) to send a notification to a user's phone",
  environment: "node",
  schema: pushover_schema,
  user: user,
  body: File.read("db/seeds/blocks/pushover.js"),
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
  name: "Transform data",
  body: File.read("db/seeds/blocks/transform.rb"),
  environment: :ruby,
  user: user,
  description: "Takes input data, and outputs the same data with some of the data renamed.",
  schema: transform_schema,
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
