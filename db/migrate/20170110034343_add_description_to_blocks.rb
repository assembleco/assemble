class AddDescriptionToBlocks < ActiveRecord::Migration[5.0]
  def change
    add_column :blocks, :description, :text
  end
end
