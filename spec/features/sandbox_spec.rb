require "rails_helper"

feature "Sandbox apps" do
  scenario "Testing out a block in a sandbox" do
    block = create(:block, environment: "ruby", body: <<-SCRIPT)
      require "json"
      input = JSON.parse(File.read("input.json"))
      puts input["message"]
    SCRIPT

    sign_in create(:user)
    visit block_path(block.user, block)
    click_on "Try it out!"
    fill_in "Input", with: '{ "foo": "bar" }'
    click_on "Go"

    expect(page).to have_content("Success")
    click_on "Success"
    expect(page).to have_content("bar")
  end

  scenario "does not create duplicate sandbox apps" do
    block = create(:block, body: <<-JS)
      flow = require('./flow.js')
      console.log(flow.input.foo)
    JS
    user = create(:user)
    app = create(:sandbox_app, user: user)
    create(:connection, app: app, destination: block)

    sign_in user
    visit block_path(block.user, block)
    expect { click_on "Try it out!" }.to change(App, :count).by(1)
    visit block_path(block.user, block)
    expect { click_on "Try it out!" }.not_to change(App, :count)
  end
end
