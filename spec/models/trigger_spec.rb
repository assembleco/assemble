require 'rails_helper'

RSpec.describe Trigger, type: :model do
  describe "validations" do
    it "fails if there is not a valid strategy backing it" do
      service = create(:service, domain: "does_not_exist.com")
      trigger = build(:trigger, name: "foobar", service: service)

      expect(trigger).not_to be_valid
      expect(trigger.errors[:name]).to include(
        "could not find a strategy for this service and trigger"
      )
    end

    it "succeeds if there is a strategy backing it" do
      service = create(:service, domain: "github.com")
      trigger = build(:trigger, name: "push", service: service)

      expect(trigger).to be_valid
    end
  end
end
