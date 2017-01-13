class User < ActiveRecord::Base
  has_many :apps
  has_many :blocks

  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true
  validates :password_digest, presence: true

  def sandbox_app
    apps.find_or_create_by!(name: "sandbox")
  end

  def sandbox_feed_for(block)
    (
      sandbox_app.connections.find_by(destination: block) ||
      sandbox_app.connections.create!(
        destination: block,
        source: Feed.create!(name: "Sandbox form: #{block.name}"),
      )
    ).source
  end

  def to_param
    username
  end
end
