require "json"

data = JSON.parse(File.read("./input.json"))

source = data["_transform"]["source"]
destination = data["_transform"]["destination"]

data[destination] = data[source]

File.write("output.json", data.to_json)
