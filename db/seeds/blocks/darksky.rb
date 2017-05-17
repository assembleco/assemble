require "json"
require "net/http"

input = JSON.parse(ARGF.read)

uri = URI("https://api.darksky.net/forecast/#{input['darksky_key']}/#{input['latitude']},#{input['longitude']}")

result = Net::HTTP.get(uri)
puts result
