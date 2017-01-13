class App < ApplicationRecord
  belongs_to :user

  has_many :block_runs
  has_many :connections

  validates :name,
    presence: true,
    uniqueness: { scope: :user_id, case_sensitive: false }
  validates :user, presence: true

  def blocks
    block_ids = connections.pluck(:destination_id)
    Block.where(id: block_ids)
  end

  # See app/assets/stylesheets/atoms/_app_border.scss
  def border_class
    app_border_id = (id - 1) % 4 + 1
    "app-border-#{app_border_id}"
  end

  def to_param
    name
  end

  def feeds
    feed_ids = connections.pluck(:source_id)
    Feed.where(id: feed_ids)
  end
end
