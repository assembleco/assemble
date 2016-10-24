# frozen_string_literal: true

FactoryGirl.define do
  factory :env_variable do
    key "foo"
    value "bar"
    flow
  end

  factory :flow do
    name "MyString"
    body "MyText"
  end
end
