# frozen_string_literal: true

FactoryGirl.define do
  factory :block, aliases: [:destination] do
    user
    github_repo "example/example"
    sequence(:name) { |n| "block_#{n}" }
  end

  factory :env_variable do
    block
    key "foo"
    value "bar"
  end

  factory :block_run do
    block
    input({ message: "Hello, World!" })
    output({ result: "Hello, World!" })
    status :success
    stderr ""
    stdout ""
  end

  factory :feed, aliases: [:source] do
    sequence(:name) { |n| "feed_#{n}" }
    schema({ type: :object, properties: {}, required: [] })
  end

  factory :user do
    sequence(:handle) { |n| "user_#{n}" }
    email { "#{handle}@example.com" }
    password_digest "password"
  end
end
