class CreateSecrets < ActiveRecord::Migration[5.0]
  def change
    create_table :secrets do |t|
      t.belongs_to :block, foreign_key: true
      t.belongs_to :user, foreign_key: true
      t.string :key, null: false
      t.string :encrypted_value, null: false
      t.string :encrypted_value_iv, null: false
    end
  end
end
