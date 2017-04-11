class AddSourceTypeToBlocks < ActiveRecord::Migration[5.0]
  def change
    add_column :blocks, :source_type, :string, null: false, default: :docker_image
    add_column :blocks, :github_gist_url, :string
  end
end
