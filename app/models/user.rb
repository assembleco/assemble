class User < ActiveRecord::Base
  has_many :blocks

  has_many :slack_authentications

  validates :github_uid, presence: true, uniqueness: true
  validates :github_token, presence: true, uniqueness: true
  validates :handle, presence: true, uniqueness: true

  before_create :generate_api_key

  def self.find_or_create_from_auth_hash(auth_hash)
    auth_params = {
      github_token: auth_hash["credentials"]["token"],
      github_uid: auth_hash["uid"],
      handle: auth_hash["info"]["nickname"],
    }

    user = find_by(auth_params.slice(:github_uid)) ||
      create!(
        github_token: auth_hash["credentials"]["token"],
        github_uid: auth_hash["uid"],
        handle: auth_hash["info"]["nickname"],
    )

    user.update!(auth_params)
    user
  end

  def sync_email_with_github
    update!(email: github_client.emails.find { |x| x[:primary] }[:email])
  end

  def generate_api_key
    begin
      self.api_key = SecureRandom.hex
    end while self.class.exists?(api_key: api_key)
  end

  def github_client
    Octokit::Client.new(access_token: github_token)
  end

  def to_param
    handle
  end
end
