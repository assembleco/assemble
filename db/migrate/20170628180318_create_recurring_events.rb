class CreateRecurringEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :recurring_events do |t|
      t.integer :frequency_quantity, null: false
      t.string :frequency_unit, null: false
      t.belongs_to :subscription, foreign_key: true, null: false
      t.string :at

      t.timestamps
    end
  end
end
