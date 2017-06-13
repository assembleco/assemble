# frozen_string_literal: true

FactoryGirl.define do
  factory :service do
    name "MyString"
    domain "MyString"
  end
  factory :block, aliases: [:destination] do
    user
    sequence(:name) { |n| "block_#{n}" }

    command "ruby /app/script.rb"
    dockerfile "FROM ruby\n"
    source "puts 'Hello, World!'\n"
    source_path "/app/script.rb"
  end

  factory :block_run do
    block
    input({ message: "Hello, World!" })
    output({ result: "Hello, World!" })
    status :success
    stderr ""
    stdout ""
  end

  factory :user do
    sequence(:handle) { |n| "user_#{n}" }
    sequence(:github_uid) { |n| n }
    sequence(:github_token) { |n| n }
  end
end
