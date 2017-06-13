class CreateEventsAgain < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.jsonb :data, default: {}
      t.belongs_to :subscription, foreign_key: true, null: false

      t.timestamps
    end

    change_table :block_runs do |t|
      t.belongs_to :event, foreign_key: true
    end
  end
end
