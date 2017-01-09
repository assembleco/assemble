require "json"
require "net/http"

class Flow
  def self.input
    JSON.parse(File.read("./input.json"))
  end

  def self.env
    JSON.parse(File.read("./env.json"))
  end

  def self.config
    JSON.parse(File.read("./config.json"))
  end

  def self.trigger(flow_id, data)
    user, flow = flow_id.split("/")

    uri = URI("https://#{config['host']}/users/#{user}/blocks/#{flow}/runs")
    res = Net::HTTP.post_form(uri, data)
    puts res.body
  end
end
