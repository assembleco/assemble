class RenameRunsToBlockRuns < ActiveRecord::Migration[5.0]
  def change
    rename_table :runs, :block_runs
  end
end
