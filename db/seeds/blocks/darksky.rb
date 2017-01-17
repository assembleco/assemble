require "json"
require "net/http"

input = JSON.parse(File.read("input.json"))

uri = URI("https://api.darksky.net/forecast/#{input['darksky_key']}/#{input['latitude']},#{input['longitude']}")

result = Net::HTTP.get(uri)
File.write("output.json", result)
