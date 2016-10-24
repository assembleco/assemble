# frozen_string_literal: true

require "rails_helper"

describe "POST runs#create" do
  it "exposes the posted parameters in './input.json'" do
    flow = create(:flow, body: <<-JS)
      flow = require('./flow.js')
      console.log(flow.input.foo)
    JS

    post "/flows/#{flow.id}/runs", params: { foo: "bar" }

    expect(response.body).to eq("bar\n")
  end

  it "exposes any set environment variables to the script" do
    flow = create(:flow, body: <<-JS)
      flow = require('./flow.js')
      console.log(flow.env.foo)
    JS
    create(:env_variable, flow: flow, key: "foo", value: "bar")

    post "/flows/#{flow.id}/runs"

    expect(response.body).to eq("bar\n")
  end
end
