class Subscription < ApplicationRecord
  belongs_to :app
  belongs_to :feed

  validates :app, presence: true
  validates :feed, presence: true, uniqueness: { scope: :app_id }
end
