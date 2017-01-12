class RenameTriggersToFeeds < ActiveRecord::Migration[5.0]
  def change
    rename_table :triggers, :feeds

    rename_column :events, :trigger_id, :feed_id
  end
end
