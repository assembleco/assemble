require 'rails_helper'

RSpec.describe Block, type: :model do
  it { should belong_to :user }

  describe "validations" do
    subject { build(:block) }

    it { should validate_presence_of :user }

    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name).
         scoped_to(:user_id).
         case_insensitive }
  end

  describe "#icon" do
    it "returns an image from `app/assets/images/blocks`" do
      block = create(:block, id: 2)

      expect(block.icon).to eq("blocks/block-2.png")
    end

    it "returns an image from `app/assets/images/blocks`" do
      block = create(:block, id: 10)

      expect(block.icon).to eq("blocks/block-10.png")
    end

    it "mods the id to make sure it's using valid blocks" do
      block = create(:block, id: 11)

      expect(block.icon).to eq("blocks/block-1.png")
    end
  end

  describe "#to_param" do
    it "uses a slug based off the block's name" do
      block = build(:block, name: "Block 1")

      expect(block.to_param).to eq("Block 1")
    end
  end
end
