class User < ActiveRecord::Base
  has_many :blocks

  validates :github_uid, presence: true, uniqueness: true
  validates :github_token, presence: true, uniqueness: true
  validates :handle, presence: true, uniqueness: true

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

  def github_client
    Octokit.new(access_token: token)
  end

  def to_param
    handle
  end
end
