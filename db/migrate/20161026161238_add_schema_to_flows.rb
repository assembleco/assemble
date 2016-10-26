# frozen_string_literal: true

class AddSchemaToFlows < ActiveRecord::Migration[5.0]
  def change
    add_column :flows, :schema, :text, null: false, default: "{}"
    change_column_null :flows, :name, false
    change_column_null :flows, :body, false
  end
end
