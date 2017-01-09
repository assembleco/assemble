require 'rails_helper'

RSpec.describe Run, type: :model do
  describe "#status" do
    it "returns :success when the exit status is zero" do
      run = build(:run, exit_status: 0)

      expect(run.status).to eq(:success)
    end

    it "returns :failure when the exit status is non-zero" do
      run = build(:run, exit_status: 1)

      expect(run.status).to eq(:failure)
    end

    it "returns :pending when the exit status is nil" do
      run = build(:run, exit_status: nil)

      expect(run.status).to eq(:pending)
    end
  end
end
