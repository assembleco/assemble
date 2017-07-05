class CreateAuthentications < ActiveRecord::Migration[5.0]
  def change
    create_table :authentications do |t|
      t.belongs_to :service, foreign_key: true
      t.belongs_to :user, foreign_key: true
      t.jsonb :credentials, null: false, default: {}

      t.timestamps
    end

    add_column :services, :oauth_provider, :string
  end
end
