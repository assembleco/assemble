class Event < ApplicationRecord
  belongs_to :subscription
  has_many :runs
end
