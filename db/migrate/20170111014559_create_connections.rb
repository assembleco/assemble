class CreateConnections < ActiveRecord::Migration[5.0]
  def change
    create_table :connections do |t|
      t.belongs_to :app, foreign_key: true
      t.references :source, polymorphic: true
      t.references :destination, polymorphic: true
    end
  end
end
