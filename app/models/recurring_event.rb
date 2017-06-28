class RecurringEvent < ApplicationRecord
  belongs_to :subscription

  validates :frequency_unit, inclusion: { in: [
    "second",
    "minute",
    "day",
    "week",
    "month",
    "year",
  ]}

  def frequency
    frequency_quantity.send(frequency_unit.pluralize)
  end
end
