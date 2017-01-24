class App < ApplicationRecord
  belongs_to :user

  has_many :block_runs
  has_many :subscriptions
  has_many :feeds, through: :subscriptions

  validates :name,
    presence: true,
    uniqueness: { scope: :user_id, case_sensitive: false }
  validates :user, presence: true

  def blocks_connected_to(source)
    connections = Array(definition[:connections][slug_for(source)])
    block_ids = connections.map { |c| c[:id] }
    Block.where(id: block_ids)
  end

  def canvas_json
    definition.merge(
      feeds: feeds.map(&method(:json_for_feed)),
      id: id,
    )
  end

  def connect(source, destination)
    if source.class == Feed && !feeds.include?(source)
      subscriptions.create!(feed: source)
    end

    self.definition = definition.tap do |d|
      d[:connections][slug_for(source)] ||= []
      d[:connections][slug_for(source)] = d[:connections][slug_for(source)] << json_for_block(destination)
    end

    save
  end

  def definition
    (super || { connections: {} }).with_indifferent_access
  end

  def incoming_connections_for(item)
    precursors = definition[:connections].keys.select do |precursor_slug|
      definition[:connections][precursor_slug].any? { |i| i[:slug] == slug_for(item) }
    end

    precursors.map(&method(:look_up_slug))
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

  private

  def slug_for(item)
    [
      item.class.to_s.downcase,
      item.id,
    ].join("-")
  end

  def json_for_block(block)
    {
      name: block.name,
      icon: block.icon,
      id: block.id,
      slug: slug_for(block),
    }
  end

  def look_up_slug(slug)
    klass, id = slug.split("-")
    klass.classify.constantize.find(id)
  end

  def json_for_feed(feed)
    {
      id: feed.id,
      name: feed.name,
      slug: slug_for(feed),
    }
  end
end
