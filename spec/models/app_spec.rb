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

      block_info = app.canvas_json[:connections]["feed-#{feed.id}"].first.with_indifferent_access
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
      app.connect(block_1, block_2)

      block_info = app.canvas_json[:connections]["block-#{block_1.id}"].first.with_indifferent_access
      expect(block_info[:icon]).to eq(block_2.icon)
      expect(block_info[:id]).to eq(block_2.id)
      expect(block_info[:name]).to eq("baz block")
      expect(block_info[:slug]).to eq("block-#{block_2.id}")
      expect(block_info[:schema]).to be_present
    end
  end
end
