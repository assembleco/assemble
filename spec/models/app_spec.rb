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
      feed_slug, block_slug = app.connect(feed, block)

      expect(app.canvas_json[:connections][feed_slug]).to eq([block_slug])

      block_info = app.canvas_json[:blocks][block_slug]
      expect(block_info[:icon]).to eq(block.icon)
      expect(block_info[:id]).to eq(block.id)
      expect(block_info[:name]).to eq("bar block")
      expect(block_info[:slug]).to eq("block-#{block.id}")
      expect(block_info[:schema]).to be_present
    end

    it "should represent connections between two blocks" do
      app = create(:app)
      block_1 = create(:block, name: "bar block")
      block_2 = create(:block, name: "baz block")
      block_1_slug, block_2_slug = app.connect(block_1, block_2)

      expect(app.canvas_json[:connections][block_1_slug]).to eq([block_2_slug])
    end
  end
end
