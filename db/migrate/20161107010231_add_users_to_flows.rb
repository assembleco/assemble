class AddUsersToFlows < ActiveRecord::Migration[5.0]
  def change
    add_reference :flows, :user, foreign_key: true, null: false
  end
end
