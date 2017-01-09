class Trigger < ApplicationRecord
  has_many :blocks

  validates :name, presence: true

  def to_param
    name
  end
end
