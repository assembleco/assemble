class DropEnvVariables < ActiveRecord::Migration[5.0]
  def change
    drop_table :env_variables do |t|
      t.belongs_to :block,   foreign_key: true, null: false
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false
      t.string :key,        null: false
      t.string :value,      null: false
    end
  end
end
