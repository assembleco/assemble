class Trigger < ApplicationRecord
  belongs_to :service

  validates :name, presence: true, uniqueness: { scope: :service_id }
  validates :service, presence: true
end
