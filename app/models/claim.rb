class Claim < ApplicationRecord
  belongs_to :user
  has_many :blocks, dependent: :destroy

  def fetch_unregistered_images
    response = JSON.parse(HTTParty.get("https://hub.docker.com/v2/repositories/#{handle}/").body)
    response["results"].map { |x| x["name"] } - blocks.pluck(:name)
  end

  def to_param
    handle
  end
end
