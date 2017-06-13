class Service < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :domain, presence: true, uniqueness: { case_sensitive: false }
end
