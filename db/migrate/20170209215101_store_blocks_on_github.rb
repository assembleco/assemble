class StoreBlocksOnGithub < ActiveRecord::Migration[5.0]
  def change
    remove_column :blocks, :body, :text, null: false
    remove_column :blocks, :environment, :string, null: false, default: "node"
    remove_index :blocks, column: [:user_id], using: :btree

    add_column :blocks, :github_repo, :string, null: false
  end
end
