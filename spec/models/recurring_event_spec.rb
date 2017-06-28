require 'rails_helper'

RSpec.describe RecurringEvent, type: :model do
  describe "#frequency" do
    it "combines the `frequency_quantity` and `frequency_unit` fields" do
      recurrence = RecurringEvent.new(
        frequency_quantity: 2,
        frequency_unit: "day",
      )

      expect(recurrence.frequency).to eq(2.days)
    end
  end
end
