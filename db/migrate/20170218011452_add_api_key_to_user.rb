class AddApiKeyToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :api_key, :string, null: false, unique: true
  end
end
