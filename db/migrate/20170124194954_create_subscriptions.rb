class CreateSubscriptions < ActiveRecord::Migration[5.0]
  def change
    create_table :subscriptions do |t|
      t.belongs_to :app, foreign_key: true, null: false
      t.belongs_to :feed, foreign_key: true, null: false
      t.timestamps
    end
  end
end
