require "json"

data = JSON.parse(ARGF.read)

source = data["_transform"]["source"]
destination = data["_transform"]["destination"]

data[destination] = data[source]

puts data.to_json
