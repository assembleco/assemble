require 'rails_helper'

RSpec.describe BlockRun, type: :model do
  describe "#exit_status=" do
    it "sets status to :success when the exit status is zero" do
      block_run = build(:block_run, exit_status: 0)

      expect(block_run.status).to eq("success")
    end

    it "sets status to :failure when the exit status is non-zero" do
      block_run = build(:block_run, exit_status: 1)

      expect(block_run.status).to eq("failure")
    end
  end

  describe "#status" do
    it "defaults to pending" do
      block_run = BlockRun.new

      expect(block_run.status).to eq("pending")
    end
  end
end
