class App < ApplicationRecord
  belongs_to :user

  has_many :connections

  validates :name,
    presence: true,
    uniqueness: { scope: :user_id, case_sensitive: false }
  validates :user, presence: true

  def blocks
    block_ids = connections.pluck(:destination_id)
    Block.where(id: block_ids)
  end

  def border_class
    "app-border-#{id % 4 + 1}"
  end

  def to_param
    name
  end

  def triggers
    trigger_ids = connections.pluck(:source_id)
    Trigger.where(id: trigger_ids)
  end
end
