# frozen_string_literal: true

FactoryGirl.define do
  factory :app do
    user
    name "MyString"
    description "MyText"

    factory :sandbox_app do
    end
  end

  factory :block, aliases: [:destination] do
    user
    environment :node
    sequence(:name) { |n| "block_#{n}" }
    body "require('./flow.js'); console.log(flow.input.message)"
  end

  factory :connection do
    app
    source
    destination
  end

  factory :env_variable do
    block
    key "foo"
    value "bar"
  end

  factory :block_run do
    app
    block
    input '{ "message": "Hello, World!" }'
    output '{ "result": "Hello, World!" }'
    status :success
    stderr ""
    stdout ""
  end

  factory :feed, aliases: [:source] do
    sequence(:name) { |n| "feed_#{n}" }
    schema "{}"
  end

  factory :user do
    sequence(:username) { |n| "user_#{n}" }
    email { "#{username}@example.com" }
    password_digest "password"
  end
end
