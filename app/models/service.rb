require "authentication_strategy/bitbucket"

class Service < ApplicationRecord
  AUTHENTICATION_STRATEGIES = {
    "bitbucket.org" => AuthenticationStrategy::BitBucket,
  }

  validates :name, presence: true, uniqueness: true
  validates :domain, presence: true, uniqueness: { case_sensitive: false }

  def parse_oauth_payload(oauth_payload)
    auth_strategy.new(oauth_payload).credentials
  end

  private

  def auth_strategy
    AUTHENTICATION_STRATEGIES.fetch(domain)
  end
end
