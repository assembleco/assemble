class App < ApplicationRecord
  belongs_to :user

  validates :name, uniqueness: { scope: :user_id, case_sensitive: false }
  validates :user, presence: true

  def to_path
    [user, self]
  end

  def to_param
    name
  end
end
