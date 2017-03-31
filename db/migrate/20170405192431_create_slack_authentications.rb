class CreateSlackAuthentications < ActiveRecord::Migration[5.0]
  def change
    create_table :slack_authentications do |t|
      t.string :handle, null: false
      t.string :team, null: false
      t.string :slack_user_id, null: false, unique: true
      t.string :slack_team_id, null: false
      t.string :token, null: false, unique: true

      t.belongs_to :user, foreign_key: true, null: false
    end
  end
end
