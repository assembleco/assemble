# frozen_string_literal: true

require "rails_helper"

describe "POST runs#create" do
  it "exposes any set environment variables to the script" do
    skip "Environment variables should be renamed to `Configuration variables`,
    and should be associated with apps, not programs.
    They should potentially have a `public` option,
    so that they can be copied over with an app if they're not sensitive."

    block = create(:block, body: <<-JS)
      flow = require('./flow.js')
      console.log(flow.env.foo)
    JS
    create(:env_variable, block: block, key: "foo", value: "bar")

    expect do
      post(
        "/blocks/#{block.user.username}/#{block.name}/runs",
        params: { foo: "bar" },
      )
    end.to change(Run, :count).by(1)

    expect(response.body).to eq("Run has been queued.")
    expect(Run.last.output).to eq("bar\n")
  end
end

describe "POST events#create" do
  it "runs subscribed blocks with the provided input" do
    message = "this is a sample message"
    trigger = create(:trigger, schema: <<-JS)
      {
        "type": "object",
        "properties": {
          "message": { "type": "string" }
        },
        "required": ["message"]
      }
    JS

    block = create(:block, environment: "node", body: <<-JS)
      flow = require('./flow.js')
      console.log(flow.input.message)
    JS

    create(:connection, source: trigger, destination: block)
    params = { event: { message: message }, format: 'text' }

    expect do
      post "/events/#{trigger.name}", params: params
    end.to change(Run, :count).by(1)

    run = Run.last
    expect(run.block).to eq(block)
    expect(run.output).to eq(message + "\n")
    expect(response.body).to eq t(
      "events.create.success",
      num_apps: '1 app',
      num_blocks: '1 block',
    )
  end

  it "rejects events that do not match the schema" do
    schema = <<-SCHEMA
      {
        "type": "object",
        "properties": { "foo": { "type": "integer" } }
      }
      SCHEMA

    block = create(:block, schema: schema)
    trigger = create(:trigger, schema: schema)
    create(:connection, source: trigger, destination: block)

    params = { event: { foo: "bar" }, format: :text }
    post("/events/#{trigger.name}", params: params)

    expect(response).to be_success
    expect(response.body).to eq t(
      "events.create.success",
      num_apps: '1 app',
      num_blocks: '1 block',
    )
    expect(Run.last.status).to eq(Run::INPUT_SCHEMA_NOT_SATISFIED)
  end

  it "only runs blocks when their schemas are fully satisfied by their connections"

  it "calls the correct version of the script for you" do
    skip
    # NEEDS DESIGN VALIDATION
    # semantic versioning is incredibly useful,
    # but is still an implementation detail
    # that people shouldn't have to worry about.
    # Instead, we can guess when breaking changes are happening
    # by looking for changes in blocks' schemas,
    # and reflect that with a major version bump.
    #
    # When Block A triggers Block B,
    # instead of specifying the version of Block B
    # that we waant to run,
    # we can infer the version based on the `created_at`
    # or most recent `udpated_at` of the script,
    # compared to the creation time of the most recent version of script B.
  end

  it "rejects events that are not properly authenticated"
  it "rejects events that are not authorized for the event stream"
end
