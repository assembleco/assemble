class CreateTriggersAgain < ActiveRecord::Migration[5.0]
  def change
    create_table :triggers do |t|
      t.string :name, null: false
      t.text :description
      t.jsonb :options_schema, null: false, default: {}
      t.jsonb :data_schema, null: false, default: {}
      t.belongs_to :service, null: false

      t.timestamps
    end
  end
end
