# frozen_string_literal: true
require "rails_helper"

RSpec.feature "Flow" do
  scenario "creation" do
    visit new_flow_path

    fill_in :flow_name, with: "Say Hello"
    fill_in :flow_body, with: "console.log('Hello');"
    click_on "Create Flow"

    expect(page).to have_content t("flows.create.success")
    expect(page).to have_content "Say Hello"
  end

  scenario "Running a flow with sample data" do
    flow = create(
      :flow,
      body: "module.exports = function(arg) { return('Hello, ' + arg); }",
    )

    visit flows_path
    click_on flow.name
    fill_in :run_args, with: "World"
    click_on "Create Run"

    expect(page).to have_content t("runs.create.success")
    expect(page).to have_content("Hello, World")
  end
end
