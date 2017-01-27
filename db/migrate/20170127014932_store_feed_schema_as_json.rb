class StoreFeedSchemaAsJson < ActiveRecord::Migration[5.0]
  def change
    remove_column :feeds, :schema, :text, null: false, default: "{}"

    change_table :feeds do |t|
      t.jsonb :schema
    end

    add_index :feeds, :schema, using: :gin
  end
end
