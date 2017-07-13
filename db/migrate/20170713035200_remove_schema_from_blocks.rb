class RemoveSchemaFromBlocks < ActiveRecord::Migration[5.0]
  def change
    remove_column :blocks, :schema, :jsonb
  end
end
