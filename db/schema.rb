# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161026161238) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "env_variables", force: :cascade do |t|
    t.string   "key",        null: false
    t.string   "value",      null: false
    t.integer  "flow_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["flow_id"], name: "index_env_variables_on_flow_id", using: :btree
  end

  create_table "flows", force: :cascade do |t|
    t.string   "name",                      null: false
    t.text     "body",                      null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.text     "schema",     default: "{}", null: false
  end

  add_foreign_key "env_variables", "flows"
end
