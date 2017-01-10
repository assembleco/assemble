class App < ApplicationRecord
  belongs_to :user

  validates :name,
    presence: true,
    uniqueness: { scope: :user_id, case_sensitive: false }
  validates :user, presence: true

  def to_param
    name
  end
end
