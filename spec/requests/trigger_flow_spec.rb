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

  it "validates the input against the defined schema" do
    flow = create(
      :flow,
      schema: <<-SCHEMA,
      {
        "title": "Input schema",
        "type": "object",
        "properties": {
          "foo": {
            "type": "integer"
          }
        },
        "required": "foo"
      }
      SCHEMA
    )

    post "/flows/#{flow.id}/runs", params: { foo: "bar" }

    expect(response).to be_unprocessable
    # expect run to not be created
  end
end
