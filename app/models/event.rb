class Event < ApplicationRecord
  belongs_to :feed

  def save
    super

    feed.connections.each do |connection|
      block_run = BlockRun.create!(
        app: connection.app,
        block: connection.destination,
        input: data,
      )

      block_run.delay.execute
    end
  end
end
