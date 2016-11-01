class CreateRuns < ActiveRecord::Migration[5.0]
  def change
    create_table :runs do |t|
      t.belongs_to :flow, foreign_key: true, null: false
      t.text :args
      t.integer :exit_status
      t.text :output
      t.text :run_errors

      t.timestamps
    end
  end
end
