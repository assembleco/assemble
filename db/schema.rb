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

ActiveRecord::Schema.define(version: 20170209215101) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "apps", force: :cascade do |t|
    t.string   "name"
    t.integer  "user_id"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.jsonb    "definition"
    t.index ["definition"], name: "index_apps_on_definition", using: :gin
    t.index ["user_id"], name: "index_apps_on_user_id", using: :btree
  end

  create_table "block_runs", force: :cascade do |t|
    t.integer  "block_id",                        null: false
    t.integer  "exit_status"
    t.text     "stdout"
    t.text     "stderr"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.string   "status",      default: "pending", null: false
    t.jsonb    "input"
    t.jsonb    "output"
    t.integer  "app_id"
    t.index ["app_id"], name: "index_block_runs_on_app_id", using: :btree
    t.index ["block_id"], name: "index_block_runs_on_block_id", using: :btree
    t.index ["input"], name: "index_block_runs_on_input", using: :gin
    t.index ["output"], name: "index_block_runs_on_output", using: :gin
  end

  create_table "blocks", force: :cascade do |t|
    t.string   "name",        null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "user_id",     null: false
    t.text     "description"
    t.jsonb    "schema"
    t.string   "github_repo", null: false
    t.index ["schema"], name: "index_blocks_on_schema", using: :gin
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

  create_table "events", force: :cascade do |t|
    t.integer "feed_id"
    t.jsonb   "data"
    t.index ["data"], name: "index_events_on_data", using: :gin
    t.index ["feed_id"], name: "index_events_on_feed_id", using: :btree
  end

  create_table "feeds", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb    "schema"
    t.index ["schema"], name: "index_feeds_on_schema", using: :gin
  end

  create_table "subscriptions", force: :cascade do |t|
    t.integer  "app_id",     null: false
    t.integer  "feed_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["app_id"], name: "index_subscriptions_on_app_id", using: :btree
    t.index ["feed_id"], name: "index_subscriptions_on_feed_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "bio"
    t.string   "location"
    t.string   "website"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
  end

  add_foreign_key "apps", "users"
  add_foreign_key "block_runs", "apps"
  add_foreign_key "block_runs", "blocks"
  add_foreign_key "blocks", "users"
  add_foreign_key "env_variables", "blocks"
  add_foreign_key "events", "feeds"
  add_foreign_key "subscriptions", "apps"
  add_foreign_key "subscriptions", "feeds"
end
