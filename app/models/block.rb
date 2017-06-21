# frozen_string_literal: true

class Block < ApplicationRecord
  EMPTY_SCHEMA = { type: "object", properties: {}, required: [] }.freeze

  belongs_to :user
  belongs_to :environment

  has_many :runs, dependent: :destroy, class_name: "BlockRun"
  has_many :subscriptions, dependent: :destroy

  validates :user, presence: true

  def active
    false
  end

  def handle
    user.handle
  end

  def schema
    super || EMPTY_SCHEMA
  end

  def schema_json
    schema.to_json
  end

  def schema_json=(value)
    self.schema = JSON.parse(value)
  end
end
