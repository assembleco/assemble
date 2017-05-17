class ReplaceDockerImageWithSource < ActiveRecord::Migration[5.0]
  def change
    remove_column :blocks, :docker_image, :string

    add_column :blocks, :command, :string
    add_column :blocks, :dockerfile, :text
    add_column :blocks, :source, :text
    add_column :blocks, :source_path, :string
  end
end
