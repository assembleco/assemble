# frozen_string_literal: true
require "rails_helper"

RSpec.feature "Blocks" do
  scenario "creation" do
    user = sign_in create(:user)

    visit new_block_path(user)
    fill_in :block_name, with: "Say Hello"
    fill_in :block_body, with: "console.log('Hello');"
    fill_in :block_schema, with: "{}"
    click_on "Create Block"

    expect(page).to have_content t("blocks.create.success")
    expect(page).to have_content "Say Hello"
    expect(page).to have_content "console.log('Hello');"
    expect(page).to have_content "{}"
  end

  scenario "blocks index shows all of the current user's blocks" do
    user = create(:block, name: "My block").user
    create(:block, name: "Other block")

    sign_in user
    visit user_blocks_path(user)

    expect(page).to have_content("My block")
    expect(page).not_to have_content("Other block")
  end

  scenario "viewing a block's runs" do
    run = create(:run)

    sign_in run.user
    visit block_path(run.user, run.block)
    click_on "Success"

    expect(page).to have_content run.args
  end

  scenario "managing a block's environment variables" do
    env = create(:env_variable, key: "sample_var")

    sign_in env.block.user
    visit block_path(env.block.user, env.block)
    click_on "[X]"
    click_on "+ Add Variable"
    fill_in :env_variable_key, with: "new_variable"
    fill_in :env_variable_value, with: "bar"
    click_on "Create Env variable"

    expect(page).to have_content("new_variable")
  end
end
