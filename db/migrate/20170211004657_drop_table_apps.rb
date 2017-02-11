class DropTableApps < ActiveRecord::Migration[5.0]
  def change
    remove_reference :block_runs, :app, foreign_key: true

    drop_table :subscriptions do |t|
      t.belongs_to :app, foreign_key: true, null: false
      t.belongs_to :feed, foreign_key: true, null: false
      t.timestamps
    end

    drop_table :apps do |t|
      t.string :name
      t.belongs_to :user, foreign_key: true
      t.text :description
      t.jsonb "definition"

      t.timestamps
    end
  end
end
