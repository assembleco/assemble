class GistOrGit < ActiveRecord::Migration[5.0]
  def change
    remove_column :blocks, :source_type, :string, null: false, default: :docker_image
    remove_column :blocks, :docker_image, :string
    rename_column :blocks, :github_gist_url, :source_url
  end
end
