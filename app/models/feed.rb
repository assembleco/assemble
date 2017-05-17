class Feed < ApplicationRecord
  has_many :subscriptions

  validates :name, presence: true, uniqueness: true
  validates :schema, presence: true

  def to_param
    name
  end
end
