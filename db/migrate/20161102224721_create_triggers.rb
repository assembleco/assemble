class CreateTriggers < ActiveRecord::Migration[5.0]
  def change
    create_table :triggers do |t|
      t.string :name
      t.text :schema

      t.timestamps
    end

    change_table :flows do |t|
      t.belongs_to :trigger
    end
  end
end
