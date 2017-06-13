class Subscription < ApplicationRecord
  belongs_to :block
  belongs_to :trigger
  belongs_to :user

  validates :block, presence: true
  validates :trigger, presence: true
  validates :user, presence: true
end
