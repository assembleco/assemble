class CreateServiceDependencies < ActiveRecord::Migration[5.0]
  def change
    create_table :service_dependencies do |t|
      t.belongs_to :block, foreign_key: true, null: false
      t.belongs_to :service, foreign_key: true, null: false

      t.timestamps
    end
  end
end
