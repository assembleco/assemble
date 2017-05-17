class DropEvents < ActiveRecord::Migration[5.0]
  def change
    drop_table :events do |t|
      t.belongs_to "feed", foreign_key: true
      t.jsonb   "data"
      t.index ["data"], name: "index_events_on_data", using: :gin
    end
  end
end
