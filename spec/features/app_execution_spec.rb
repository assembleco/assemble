require "rails_helper"

describe "App Execution", type: :request do
  it "runs blocks in sequence" do
    body = 'File.write("output.json", File.read("input.json"))'
    app = create(:app)
    feed = create(:feed)
    block_1 = create(:block, environment: :ruby, body: body)
    block_2 = create(:block, environment: :ruby, body: body)
    create(:subscription, app: app, feed: feed)
    app.connect(feed, block_1)
    app.connect(block_1, block_2)

    input_json = { message: "this is a sample message" }
    params = { event: input_json, format: 'text' }

    expect do
      post "/events/#{feed.name}", params: params
    end.to change(BlockRun, :count).by(2)

    BlockRun.all.each do |run|
      expect(run.output).to eq(input_json.with_indifferent_access)
    end
  end
end
