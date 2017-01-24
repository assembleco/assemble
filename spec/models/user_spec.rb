require "rails_helper"

describe User do
  describe "validations" do
    specify "username must contain only alphanumeric characters and underscores"
  end

  describe "#sandbox_feed_for" do
    it "returns the sandbox feed for a block if it exists" do
      user = create(:user)
      block = create(:block)
      feed = create(:feed)
      create(:connection, app: user.sandbox_app, source: feed, destination: block)

      sandbox_feed = nil

      expect {
        sandbox_feed = user.sandbox_feed_for(block)
      }.not_to change(Feed, :count)

      expect(sandbox_feed).to eq(feed)
    end

    it "creates and returns a sandbox feed for a block if it does not yet exist" do
      block = create(:block)
      user = create(:user)

      feed = nil

      expect {
        feed = user.sandbox_feed_for(block)
      }.to change(Feed, :count).by(1)

      connected_blocks = user.sandbox_app.blocks_connected_to(feed)
      expect(connected_blocks).to eq([block])
    end
  end
end
