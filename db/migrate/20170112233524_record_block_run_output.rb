class RecordBlockRunOutput < ActiveRecord::Migration[5.0]
  def change
    remove_column :block_runs, :args, :text
    rename_column :block_runs, :output, :stdout
    rename_column :block_runs, :run_errors, :stderr

    change_table :block_runs do |t|
      t.jsonb :input
      t.jsonb :output
    end

    add_index :block_runs, :input, using: :gin
    add_index :block_runs, :output, using: :gin
  end
end
