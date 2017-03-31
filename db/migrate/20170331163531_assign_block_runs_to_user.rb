class AssignBlockRunsToUser < ActiveRecord::Migration[5.0]
  def change
    change_table :block_runs do |t|
      t.belongs_to :user
    end
  end
end
