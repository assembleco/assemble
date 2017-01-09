# frozen_string_literal: true

FactoryGirl.define do
  factory :app do
    name "MyString"
    user nil
    description "MyText"
  end

  factory :block do
    user
    sequence(:name) { |n| "flow_#{n}" }
    body "require('./flow.js'); console.log(flow.input.message)"
  end

  factory :env_variable do
    block
    key "foo"
    value "bar"
  end

  factory :run do
    block
    args '{ "message": "Hello, World!" }'
    exit_status 0
    output "Hello, World!"
    run_errors ""
  end

  factory :trigger do
    sequence(:name) { |n| "trigger_#{n}" }
    schema "{}"
  end

  factory :user do
    sequence(:username) { |n| "user_#{n}" }
    email { "#{username}@example.com" }
    password_digest "password"
  end
end
