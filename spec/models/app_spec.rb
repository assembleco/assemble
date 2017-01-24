require 'rails_helper'

RSpec.describe App, type: :model do
  it { should belong_to :user }

  describe "validations" do
    subject { build(:app) }

    it { should validate_presence_of :user }
    it { should validate_uniqueness_of(:name).
         scoped_to(:user_id).
         case_insensitive }
  end

  describe "#canvas_json" do
    it "should represent connections between feeds and blocks" do
      app = create(:app)
      feed = create(:feed, name: "foo feed")
      block = create(:block, name: "bar block")
      app.connect(feed, block)

      expect(app.canvas_json[:connections]["feed-#{feed.id}"]).to eq [{
        icon: block.icon,
        id: block.id,
        name: "bar block",
        slug: "block-#{block.id}",
      }.with_indifferent_access]
    end

    it "should represent connections between two blocks" do
      app = create(:app)
      block_1 = create(:block, name: "bar block")
      block_2 = create(:block, name: "baz block")
      app.connect(block_1, block_2)

      expect(app.canvas_json[:connections]["block-#{block_1.id}"]).to eq [{
        icon: block_2.icon,
        id: block_2.id,
        name: "baz block",
        slug: "block-#{block_2.id}",
      }.with_indifferent_access]
    end
  end
end
