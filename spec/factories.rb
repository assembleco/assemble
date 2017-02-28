# frozen_string_literal: true

FactoryGirl.define do
  factory :block, aliases: [:destination] do
    claim
    sequence(:name) { |n| "block_#{n}" }
  end

  factory :claim do
    user
    handle "user"
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
    sequence(:github_uid) { |n| n }
    sequence(:github_token) { |n| n }
  end
end
