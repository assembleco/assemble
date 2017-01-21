# frozen_string_literal: true

class Block < ApplicationRecord
  EMPTY_SCHEMA = { type: "object", properties: {}, required: [] }.to_json.freeze

  belongs_to :user

  has_many :env_variables, dependent: :destroy
  has_many :runs, dependent: :destroy, class_name: "BlockRun"

  validates :user, presence: true
  validates :name, presence: true, uniqueness: { scope: :user_id, case_sensitive: false }

  def canvas_json_for_app(app)
    {
      name: name,
      icon: icon,
      id: id,
      connections: following_blocks_for_app(app).map { |block|
        block.canvas_json_for_app(app)
      }
    }
  end

  def icon
    block_id = (id - 1) % 10 + 1
    "blocks/block-#{block_id}.png"
  end

  def following_blocks_for_app(app)
    Connection.where(app: app, source: self).map(&:destination)
  end

  def schema
    super || EMPTY_SCHEMA
  end

  def to_param
    name
  end
end
