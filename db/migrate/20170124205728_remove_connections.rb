class RemoveConnections < ActiveRecord::Migration[5.0]
  def change
    drop_table :connections do |t|
      t.belongs_to :app, foreign_key: true
      t.references :source, polymorphic: true
      t.references :destination, polymorphic: true
    end

    change_table :apps do |t|
      t.jsonb :definition
    end

    add_index :apps, :definition, using: :gin
  end
end
