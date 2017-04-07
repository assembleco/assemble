# frozen_string_literal: true

class Block < ApplicationRecord
  EMPTY_SCHEMA = { type: "object", properties: {}, required: [] }.freeze

  belongs_to :user

  has_many :env_variables, dependent: :destroy
  has_many :runs, dependent: :destroy, class_name: "BlockRun"

  validates :docker_image, presence: true
  validates :name, presence: true, uniqueness: { scope: :user_id, case_sensitive: false }
  validates :user, presence: true

  # TODO extract to React
  def icon
    block_id = (id - 1) % 10 + 1
    "blocks/block-#{block_id}.png"
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
