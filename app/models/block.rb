# frozen_string_literal: true

class Block < ApplicationRecord
  belongs_to :user

  has_many :env_variables, dependent: :destroy
  has_many :runs, dependent: :destroy

  validates :user, presence: true
  validates :name, presence: true, uniqueness: { scope: :user_id, case_sensitive: false }

  def icon
    "blocks/block-#{id % 10 + 1}.png"
  end

  def to_param
    name
  end
end
