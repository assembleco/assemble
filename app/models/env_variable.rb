# frozen_string_literal: true

class EnvVariable < ApplicationRecord
  belongs_to :block
  has_one :user, through: :block

  validates :block, presence: true
  validates :key, presence: true, uniqueness: { scope: :block_id }
  validates :value, presence: true
end
