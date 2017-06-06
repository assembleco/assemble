require 'rails_helper'

RSpec.describe Block, type: :model do
  it { should belong_to :user }

  describe "validations" do
    subject { build(:block) }

    it { should validate_presence_of(:user) }
  end

  describe "#to_param" do
    it "uses a slug based off the block's name" do
      block = build(:block, name: "Block 1")

      expect(block.to_param).to eq("Block 1")
    end
  end
end
