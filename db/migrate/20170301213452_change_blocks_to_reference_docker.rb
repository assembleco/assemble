class ChangeBlocksToReferenceDocker < ActiveRecord::Migration[5.0]
  def change
    remove_column :blocks, :github_repo, :string
  end
end
