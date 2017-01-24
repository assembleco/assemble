class App < ApplicationRecord
  belongs_to :user

  has_many :block_runs
  has_many :connections
  has_many :subscriptions
  has_many :feeds, through: :subscriptions

  validates :name,
    presence: true,
    uniqueness: { scope: :user_id, case_sensitive: false }
  validates :user, presence: true

  def blocks_connected_to(feed)
    connections.where(source: feed).map(&:destination)
  end

  def canvas_json
    {
      id: id,
      feeds: feeds.map { |feed|
        {
          name: feed.name,
          id: feed.id,
          connections: blocks_connected_to(feed).map { |block|
            block.canvas_json_for_app(self)
          }.compact,
        }
      },
    }
  end

  def connect(source, destination)
    unless feeds.include?(source)
      subscriptions.create!(feed: source)
    end

    connections.create!(source: source, destination: destination)
  end

  def receive_event(event)
    blocks_connected_to(event.feed).each do |block|
      block_run = block_runs.create!(block: block, input: event.data)
      block_run.delay.execute
    end
  end

  def to_param
    name
  end
end
