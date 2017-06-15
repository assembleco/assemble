class AddDefaultSettingsToTriggers < ActiveRecord::Migration[5.0]
  def change
    add_column :triggers, :default_options, :jsonb, null: false, default: {}
  end
end
