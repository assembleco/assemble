class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.belongs_to :trigger, foreign_key: true
      t.jsonb :data
    end

    add_index :events, :data, using: :gin
  end
end
