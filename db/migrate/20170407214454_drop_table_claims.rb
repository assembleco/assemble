class DropTableClaims < ActiveRecord::Migration[5.0]
  def change
    remove_belongs_to :blocks, :claim, foreign_tree: true
    add_belongs_to :blocks, :user, foreign_key: true

    drop_table :claims do |t|
      t.belongs_to :user, foreign_key: true
      t.string :handle, null: false

      t.timestamps
    end
  end
end
