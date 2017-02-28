# frozen_string_literal: true

class EnvVariable < ApplicationRecord
  belongs_to :block
  has_one :claim, through: :block
  has_one :user, through: :claim

  validates :block, presence: true
  validates :key, presence: true, uniqueness: { scope: :block_id }
  validates :value, presence: true
end
