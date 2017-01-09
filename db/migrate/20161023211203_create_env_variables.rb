class CreateEnvVariables < ActiveRecord::Migration[5.0]
  def change
    create_table :env_variables do |t|
      t.string :key, null: false
      t.string :value, null: false
      t.belongs_to :block, foreign_key: true, null: false

      t.timestamps
    end
  end
end
