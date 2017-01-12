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

  describe "#execute" do
    it "only executes if status is `:pending`"

    it "sets status to :input_schema_not_satisfied when schema not satisfied" do
      block = create(:block, schema: <<-SCHEMA)
      {
        "title": "Input schema",
        "type": "object",
        "properties": {
          "foo": {
            "type": "integer"
          }
        },
        "required": ["foo"]
      }
      SCHEMA
      block_run = create(:block_run, block: block, args: "{}")

      block_run.execute
      expect(block_run.status).to eq(BlockRun::INPUT_SCHEMA_NOT_SATISFIED)
    end
  end

  describe "#status" do
    it "defaults to pending" do
      block_run = build(:block_run)

      expect(block_run.status).to eq("pending")
    end
  end
end
