# frozen_string_literal: true

class EnvVariable < ApplicationRecord
  belongs_to :flow
  has_one :user, through: :flow

  validates :flow, presence: true
  validates :key, presence: true, uniqueness: { scope: :flow_id }
  validates :value, presence: true
end
