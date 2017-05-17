require "json"

input = JSON.parse(ARGF.read)

STDERR.puts "Received input message: #{input['message']}"

puts JSON.dump({ result: "baz" })
