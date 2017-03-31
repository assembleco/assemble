class SlackAuthentication < ApplicationRecord
  belongs_to :user

  validates :handle, presence: true
  validates :slack_team_id, presence: true
  validates :slack_user_id, presence: true, uniqueness: true
  validates :team, presence: true
  validates :token, presence: true, uniqueness: true
  validates :user, presence: true
end
