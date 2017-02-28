# frozen_string_literal: true

class Block < ApplicationRecord
  EMPTY_SCHEMA = { type: "object", properties: {}, required: [] }.freeze

  belongs_to :claim
  has_one :user, through: :claim

  has_many :env_variables, dependent: :destroy
  has_many :runs, dependent: :destroy, class_name: "BlockRun"

  validates :user, presence: true
  validates :name, presence: true, uniqueness: { scope: :claim_id, case_sensitive: false }

  # TODO extract to React
  def icon
    block_id = (id - 1) % 10 + 1
    "blocks/block-#{block_id}.png"
  end

  def handle=(value)
    self.claim = Claim.find_by!(handle: value)
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
