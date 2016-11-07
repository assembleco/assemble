class User < ActiveRecord::Base
  has_many :flows

  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true
  validates :password_digest, presence: true

  def to_param
    username
  end
end
