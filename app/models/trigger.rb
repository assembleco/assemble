class Trigger < ApplicationRecord
  has_many :flows

  validates :name, presence: true

  def to_param
    name
  end
end
