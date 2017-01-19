class ChangeBlockSchemaToJson < ActiveRecord::Migration[5.0]
  def change
    remove_column :blocks, :schema, :text, null: false, default: "{}"

    change_table :blocks do |t|
      t.jsonb :schema
    end

    add_index :blocks, :schema, using: :gin
  end
end
