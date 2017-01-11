require 'rails_helper'

RSpec.describe Run, type: :model do
  describe "#exit_status=" do
    it "sets status to :success when the exit status is zero" do
      run = build(:run, exit_status: 0)

      expect(run.status).to eq("success")
    end

    it "sets status to :failure when the exit status is non-zero" do
      run = build(:run, exit_status: 1)

      expect(run.status).to eq("failure")
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
      run = create(:run, block: block, args: "{}")

      run.execute
      expect(run.status).to eq(Run::INPUT_SCHEMA_NOT_SATISFIED)
    end
  end

  describe "#status" do
    it "defaults to pending" do
      run = build(:run)

      expect(run.status).to eq("pending")
    end
  end
end
