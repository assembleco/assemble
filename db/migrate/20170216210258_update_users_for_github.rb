class UpdateUsersForGithub < ActiveRecord::Migration[5.0]
  def change
    change_table :users do |t|
      t.rename :username, :handle

      t.string :github_uid, unique: true, null: false
      t.index :github_uid

      t.string :github_token, unique: true, null: false
    end

    remove_index :users, column: [:email], unique: true, using: :btree
    remove_column :users, :email, :string, null: false
    remove_column :users, :password_digest, :string, null: false
  end
end
