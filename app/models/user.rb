class User < ActiveRecord::Base
  has_many :blocks

  validates :github_uid, presence: true, uniqueness: true
  validates :github_token, presence: true, uniqueness: true
  validates :handle, presence: true, uniqueness: true

  before_create :generate_api_key

  def self.find_or_create_from_auth_hash(auth_hash)
    require "json"
    puts JSON.pretty_generate(auth_hash.to_h)
    find_by(github_uid: auth_hash["uid"]) ||
      create!(
        github_token: auth_hash["credentials"]["token"],
        github_uid: auth_hash["uid"],
        handle: auth_hash["info"]["nickname"],
    )
  end

  def generate_api_key
    begin
      self.api_key = SecureRandom.hex
    end while self.class.exists?(api_key: api_key)
  end

  def github_client
    Octokit.new(access_token: token)
  end

  def to_param
    handle
  end
end
