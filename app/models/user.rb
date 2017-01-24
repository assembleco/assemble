class User < ActiveRecord::Base
  has_secure_password

  has_many :apps
  has_many :blocks

  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true
  validates :password_digest, presence: true

  SANDBOX_APP_DESCRIPTION = <<-DESCRIPTION
  This app is automatically created for you so that you can test out blocks that other people create.
  DESCRIPTION

  def sandbox_app
    @sandbox_app ||= apps.find_by(name: "sandbox") ||
      apps.create!(name: "sandbox", description: SANDBOX_APP_DESCRIPTION)
  end

  def sandbox_feed_for(block)
    feed = sandbox_app.incoming_connections_for(block).first

    if feed.nil?
      sandbox_feed_name = "Sandbox form: #{block.name}"
      feed = Feed.create!(name: sandbox_feed_name)
      sandbox_app.connect(feed, block)
    end

    feed
  end

  def to_param
    username
  end
end
