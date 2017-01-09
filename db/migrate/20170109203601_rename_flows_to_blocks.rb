class RenameFlowsToBlocks < ActiveRecord::Migration[5.0]
  def change
    rename_table :flows, :blocks

    rename_column :env_variables, :flow_id, :block_id
    rename_column :runs, :flow_id, :block_id
  end
end
