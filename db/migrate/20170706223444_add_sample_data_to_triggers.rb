class AddSampleDataToTriggers < ActiveRecord::Migration[5.0]
  def change
    add_column :triggers, :sample_data, :jsonb, null: false, default: {}
    remove_column :triggers, :data_schema, :jsonb, null: false, default: {}
  end
end
