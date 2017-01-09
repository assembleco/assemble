class App < ApplicationRecord
  belongs_to :user

  validates :name, uniqueness: { scope: :user_id }
  validates :user, presence: true
end
