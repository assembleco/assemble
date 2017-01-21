require "rails_helper"

describe "App Execution", type: :request do
  it "runs blocks in sequence" do
    body = 'File.write("output.json", File.read("input.json"))'
    app = create(:app)
    feed = create(:feed)
    block_1 = create(:block, environment: :ruby, body: body)
    block_2 = create(:block, environment: :ruby, body: body)
    create(:connection, app: app, source: block_1, destination: block_2)
    create(:connection, app: app, source: feed, destination: block_1)

    input_json = { message: "this is a sample message" }
    params = { event: input_json, format: 'text' }

    expect do
      post "/events/#{feed.name}", params: params
    end.to change(BlockRun, :count).by(2)

    BlockRun.all.each do |run|
      expect(run.output).to eq(input_json.to_json)
    end
  end
end
