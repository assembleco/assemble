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
    apps.find_by(name: "sandbox") ||
      apps.create!(name: "sandbox", description: SANDBOX_APP_DESCRIPTION)
  end

  def sandbox_feed_for(block)
    (
      sandbox_app.connections.find_by(destination: block) ||
      sandbox_app.connect(
        Feed.create!(name: "Sandbox form: #{block.name}"),
        block,
      )
    ).source
  end

  def to_param
    username
  end
end
