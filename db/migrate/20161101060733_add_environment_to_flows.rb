class AddEnvironmentToFlows < ActiveRecord::Migration[5.0]
  def change
    add_column :flows, :environment, :string, null: false, default: "node"
  end
end
