class Feed < ApplicationRecord
  has_many :events
  has_many :connections, as: :source

  validates :name, presence: true, uniqueness: true

  def to_param
    name
  end
end
