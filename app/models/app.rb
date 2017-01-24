class App < ApplicationRecord
  belongs_to :user

  has_many :block_runs
  has_many :connections

  validates :name,
    presence: true,
    uniqueness: { scope: :user_id, case_sensitive: false }
  validates :user, presence: true

  def canvas_json
    {
      id: id,
      feeds: feeds.map { |feed|
        {
          name: feed.name,
          connections: feed.connections.where(app: self).map { |connection|
            connection.destination.try(:canvas_json_for_app, self)
          }.compact,
        }
      },
    }
  end

  def blocks
    block_ids = connections.pluck(:destination_id)
    Block.where(id: block_ids)
  end

  def to_param
    name
  end

  def feeds
    feed_ids = connections.pluck(:source_id)
    Feed.where(id: feed_ids)
  end
end
