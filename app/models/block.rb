# frozen_string_literal: true

class Block < ApplicationRecord
  EMPTY_SCHEMA = { type: "object", properties: {}, required: [] }.freeze

  belongs_to :user
  has_many :runs, dependent: :destroy, class_name: "BlockRun"

  validates :user, presence: true

  def active
    false
  end

  def event_settings
    {
      repo: "assembleapp/registry",
      branch: "master",
    }
  end

  def as_json
    super.merge(
      active: active,
      user: user.as_json,
    )
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

  def to_param
    name
  end
end
