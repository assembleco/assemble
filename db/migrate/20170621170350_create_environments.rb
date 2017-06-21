class CreateEnvironments < ActiveRecord::Migration[5.0]
  def change
    create_table :environments do |t|
      t.string :name, null: false
      t.string :command
      t.string :source_path
      t.text :dockerfile
      t.text :preamble

      t.timestamps
    end

    change_table :blocks do |t|
      t.belongs_to :environment, foreign_key: true
    end

    remove_column :blocks, :command, :string
    remove_column :blocks, :dockerfile, :text
    remove_column :blocks, :source_path, :string
  end
end
