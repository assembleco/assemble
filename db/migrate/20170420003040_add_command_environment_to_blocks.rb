class AddCommandEnvironmentToBlocks < ActiveRecord::Migration[5.0]
  def change
    add_column :blocks, :command, :string, null: false, default: "ruby script.rb"
    add_column :blocks, :environment, :string, null: false, default: :ruby
  end
end
