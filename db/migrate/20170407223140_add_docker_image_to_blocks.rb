class AddDockerImageToBlocks < ActiveRecord::Migration[5.0]
  def change
    add_column :blocks, :docker_image, :string
  end
end
