class RemoveEnvironments < ActiveRecord::Migration[5.0]
  def change
    change_table :blocks do |t|
      t.string :command
      t.string :source_path
      t.text :dockerfile
    end

    execute <<-SQL
      UPDATE blocks
      SET command = (SELECT command FROM environments WHERE id=blocks.environment_id)
    SQL

    execute <<-SQL
      UPDATE blocks
      SET dockerfile = (SELECT dockerfile FROM environments WHERE id=blocks.environment_id)
    SQL

    execute <<-SQL
      UPDATE blocks
      SET source_path = (SELECT source_path FROM environments WHERE id=blocks.environment_id)
    SQL

    remove_column :blocks, :environment_id, :integer

    drop_table :environments do |t|
      t.string :name, null: false
      t.string :command
      t.string :source_path
      t.text :dockerfile
      t.text :preamble

      t.timestamps
    end
  end
end
