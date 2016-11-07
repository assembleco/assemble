# frozen_string_literal: true

FactoryGirl.define do
  factory :env_variable do
    flow
    key "foo"
    value "bar"
  end

  factory :flow do
    sequence(:name) { |n| "flow_#{n}" }
    body "require('./flow.js'); console.log(flow.input.message)"
  end

  factory :run do
    flow
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
