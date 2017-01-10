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

ActiveRecord::Schema.define(version: 20170110034343) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "apps", force: :cascade do |t|
    t.string   "name"
    t.integer  "user_id"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["user_id"], name: "index_apps_on_user_id", using: :btree
  end

  create_table "blocks", force: :cascade do |t|
    t.string   "name",                         null: false
    t.text     "body",                         null: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.text     "schema",      default: "{}",   null: false
    t.string   "environment", default: "node", null: false
    t.integer  "trigger_id"
    t.integer  "user_id",                      null: false
    t.text     "description"
    t.index ["trigger_id"], name: "index_blocks_on_trigger_id", using: :btree
    t.index ["user_id"], name: "index_blocks_on_user_id", using: :btree
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer  "priority",   default: 0, null: false
    t.integer  "attempts",   default: 0, null: false
    t.text     "handler",                null: false
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["priority", "run_at"], name: "delayed_jobs_priority", using: :btree
  end

  create_table "env_variables", force: :cascade do |t|
    t.string   "key",        null: false
    t.string   "value",      null: false
    t.integer  "block_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["block_id"], name: "index_env_variables_on_block_id", using: :btree
  end

  create_table "runs", force: :cascade do |t|
    t.integer  "block_id",    null: false
    t.text     "args"
    t.integer  "exit_status"
    t.text     "output"
    t.text     "run_errors"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["block_id"], name: "index_runs_on_block_id", using: :btree
  end

  create_table "triggers", force: :cascade do |t|
    t.string   "name"
    t.text     "schema"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
  end

  add_foreign_key "apps", "users"
  add_foreign_key "blocks", "users"
  add_foreign_key "env_variables", "blocks"
  add_foreign_key "runs", "blocks"
end
