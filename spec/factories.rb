# frozen_string_literal: true

FactoryGirl.define do
  factory :env_variable do
    flow
    key "foo"
    value "bar"
  end

  factory :flow do
    sequence(:name) { |n| "Flow #{n}" }
    body "require('./flow.js'); console.log(flow.input.message)"
  end

  factory :run do
    flow
    args '{ "message": "Hello, World!" }'
    exit_status 0
    output "Hello, World!"
    run_errors ""
  end
end
