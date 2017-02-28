class CreateClaims < ActiveRecord::Migration[5.0]
  def change
    create_table :claims do |t|
      t.belongs_to :user, foreign_key: true
      t.string :handle, null: false

      t.timestamps
    end

    change_table :blocks do |t|
      t.belongs_to :claim, foreign_key: true
    end

    remove_column :blocks, :user_id, :integer
  end
end
