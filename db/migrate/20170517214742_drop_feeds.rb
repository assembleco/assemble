class DropFeeds < ActiveRecord::Migration[5.0]
  def change
    drop_table :feeds do |t|
      t.string   "name"
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.jsonb    "schema"
      t.index ["schema"], name: "index_feeds_on_schema", using: :gin
    end
  end
end
