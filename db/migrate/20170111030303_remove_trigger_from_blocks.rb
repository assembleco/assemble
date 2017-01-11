class RemoveTriggerFromBlocks < ActiveRecord::Migration[5.0]
  def change
    remove_reference :blocks, :trigger
  end
end
