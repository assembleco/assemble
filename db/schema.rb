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

ActiveRecord::Schema.define(version: 20170517214742) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

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
    t.integer  "user_id"
    t.index ["block_id"], name: "index_block_runs_on_block_id", using: :btree
    t.index ["input"], name: "index_block_runs_on_input", using: :gin
    t.index ["output"], name: "index_block_runs_on_output", using: :gin
    t.index ["user_id"], name: "index_block_runs_on_user_id", using: :btree
  end

  create_table "blocks", force: :cascade do |t|
    t.string   "name",        null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.text     "description"
    t.jsonb    "schema"
    t.integer  "user_id"
    t.string   "command"
    t.text     "dockerfile"
    t.text     "source"
    t.string   "source_path"
    t.index ["schema"], name: "index_blocks_on_schema", using: :gin
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

  create_table "slack_authentications", force: :cascade do |t|
    t.string  "handle",        null: false
    t.string  "team",          null: false
    t.string  "slack_user_id", null: false
    t.string  "slack_team_id", null: false
    t.string  "token",         null: false
    t.integer "user_id",       null: false
    t.index ["user_id"], name: "index_slack_authentications_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "handle",       null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "bio"
    t.string   "location"
    t.string   "website"
    t.string   "github_uid",   null: false
    t.string   "github_token", null: false
    t.string   "api_key",      null: false
    t.string   "email"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["github_uid"], name: "index_users_on_github_uid", using: :btree
  end

  add_foreign_key "block_runs", "blocks"
  add_foreign_key "blocks", "users"
  add_foreign_key "slack_authentications", "users"
end
