# Remove any data currently in the database

EnvVariable.destroy_all
BlockRun.destroy_all
Connection.destroy_all
Block.destroy_all
Event.destroy_all
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

Block.create!(
  name: "Get the weather forecast from DarkSky",
  description: "This block connects to the Dark Sky API (https://darksky.net/) to pull the latest weather forecast information.",
  environment: "ruby",
  schema: '{
    "type": "object",
    "properties": {
      "darksky_key": { "type": "string" },
      "latitude": { "type": "string" },
      "longitude": { "type": "string" }
    },
    "required": [
      "darksky_key",
      "latitude",
      "longitude"
    ]
  }',
  user: user,
  body: File.read("db/seeds/blocks/darksky.rb"),
)

# TODO create default values for DarkSky block: Lat & Long for OAK, CA

Block.create!(
  name: "Send a phone notification via Pushover",
  description: "Use Pushover (https://pushover.net/) to send a notification to a user's phone",
  environment: "node",
  schema: '{
    "title": "Example Schema",
    "type": "object",
    "properties": {
      "text": {
        "type": "string"
      },
      "pushover": {
        "type": "object",
        "properties": {
          "user_id": { "type": "string" },
          "key": { "type": "string" }
        },
        "required": ["user_id", "key"]
      }
    },
    "required": ["text", "pushover"]
  }',
  user: user,
  body: File.read("db/seeds/blocks/pushover.js"),
)

# Create time-based feeds
Feed.create!(name: "weekly")
Feed.create!(name: "daily")
Feed.create!(name: "hourly")
Feed.create!(name: "minutely")
