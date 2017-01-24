class Event < ApplicationRecord
  belongs_to :feed

  def save
    super

    feed.subscriptions.each do |subscription|
      subscription.app.receive_event(self)
    end
  end
end
