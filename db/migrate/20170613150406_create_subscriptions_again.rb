class CreateSubscriptionsAgain < ActiveRecord::Migration[5.0]
  def change
    create_table :subscriptions do |t|
      t.belongs_to :block, foreign_key: true, null: false
      t.belongs_to :user, foreign_key: true, null: false
      t.belongs_to :trigger, foreign_key: true, null: false
      t.datetime :activated_at
      t.datetime :deactivated_at
      t.jsonb :data_overrides, default: {}
      t.jsonb :trigger_options, default: {}
      t.string :remote_webhook_id

      t.timestamps
    end
  end
end
