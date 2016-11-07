# frozen_string_literal: true
require "rails_helper"

RSpec.feature "Flow" do
  scenario "creation" do
    user = sign_in create(:user)

    visit new_user_flow_path(user)
    fill_in :flow_name, with: "Say Hello"
    fill_in :flow_body, with: "console.log('Hello');"
    fill_in :flow_schema, with: "{}"
    click_on "Create Flow"

    expect(page).to have_content t("flows.create.success")
    expect(page).to have_content "Say Hello"
    expect(page).to have_content "console.log('Hello');"
    expect(page).to have_content "{}"
  end

  scenario "flow index shows all of the current user's flows" do
    user = create(:flow, name: "My flow").user
    create(:flow, name: "Other flow")

    sign_in user
    visit user_flows_path(user)

    expect(page).to have_content("My flow")
    expect(page).not_to have_content("Other flow")
  end

  scenario "viewing a flow's runs" do
    run = create(:run)

    sign_in run.user
    visit user_flow_path(run.user, run.flow)
    click_on "Success"

    expect(page).to have_content run.args
  end

  scenario "managing a flow's environment variables" do
    env = create(:env_variable, key: "sample_var")

    sign_in env.flow.user
    visit user_flow_path(env.flow.user, env.flow)
    click_on "[X]"
    click_on "+ Add Variable"
    fill_in :env_variable_key, with: "new_variable"
    fill_in :env_variable_value, with: "bar"
    click_on "Create Env variable"

    expect(page).to have_content("new_variable")
  end
end
