require "json"

input = JSON.parse(File.read("input.json"))

puts "Received input message: #{input['message']}"

File.write("output.json", JSON.dump({ result: "baz" }))
