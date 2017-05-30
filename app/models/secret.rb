class Secret < ApplicationRecord
  belongs_to :block
  belongs_to :user

  attr_encrypted :value, key: Base64.decode64(ENV.fetch("SECRET_ENCRYPTION_KEY"))

  validates :block, presence: true
  validates :key, presence: true
  validates :user, presence: true
  validates :value, presence: true
end
