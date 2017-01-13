class AddAppIdToBlockRuns < ActiveRecord::Migration[5.0]
  def change
    add_reference :block_runs, :app, foreign_key: true
  end
end
