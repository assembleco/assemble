# frozen_string_literal: true
require "rails_helper"

RSpec.feature "Blocks" do
  scenario "creation" do
    user = sign_in create(:user)

    visit new_block_path
    fill_in :block_name, with: "Say Hello"
    fill_in :block_description, with: "This block says hello."
    fill_in :block_body, with: "console.log('Hello');"
    fill_in :block_schema, with: "{}"
    click_on "Create Block"

    expect(page).to have_content t("blocks.create.success")
    expect(page).to have_content "Say Hello"
    expect(page).to have_content "This block says hello."
    expect(page).to have_content "console.log('Hello');"
    expect(page).to have_content "{}"
  end

  scenario "creation with errors" do
    user = sign_in create(:user)

    visit new_block_path
    fill_in :block_body, with: "We left the name blank!"
    click_on "Create Block"

    expect(page).to have_content t("blocks.create.failure")
  end

  scenario "update" do
    block = create(:block)
    user = block.user

    sign_in user
    visit edit_block_path(user, block)
    fill_in :block_name, with: "Say Hello"
    fill_in :block_description, with: "This block says hello."
    fill_in :block_body, with: "console.log('Hello');"
    fill_in :block_schema, with: "{}"
    click_on "Update Block"

    expect(page).to have_content t("blocks.update.success")
    expect(page).to have_content "Say Hello"
    expect(page).to have_content "This block says hello."
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
    block_run = create(:block_run, exit_status: 0)

    sign_in block_run.app.user
    visit block_path(block_run.block.user, block_run.block)
    expect(page).to have_content("Success")
    click_on "Success"

    expect(page).to have_content block_run.input
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

  scenario "navigating to a block's author" do
    block = create(:block)

    sign_in create(:user)
    visit block_path(block.user, block)
    click_on block.user.username

    expect(page).to have_heading(block.user.username)
    expect(current_path).to eq user_path(block.user)
  end
end
