# frozen_string_literal: true
require "rails_helper"

RSpec.feature "Blocks" do
  scenario "creation" do
    user = sign_in create(:user)

    visit new_block_path
    fill_in :block_name, with: "Say Hello"
    fill_in :block_description, with: "This block says hello."
    fill_in :block_github_repo, with: "example/example"
    click_on "Create Block"

    expect(page).to have_content t("blocks.create.success")
    expect(page).to have_content "Say Hello"
    expect(page).to have_content "This block says hello."
  end

  scenario "creation with errors" do
    user = sign_in create(:user)

    visit new_block_path
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
    fill_in :block_github_repo, with: "example/example"
    click_on "Update Block"

    expect(page).to have_content t("blocks.update.success")
    expect(page).to have_content "Say Hello"
    expect(page).to have_content "This block says hello."
  end

  scenario "blocks index shows all of the current user's blocks" do
    user = create(:block, name: "My block").user
    create(:block, name: "Other block")

    sign_in user
    visit user_blocks_path(user)

    expect(page).to have_content("My block")
    expect(page).not_to have_content("Other block")
  end

  scenario "navigating to a block's author" do
    block = create(:block)

    sign_in create(:user)
    visit block_path(block.user, block)
    first("a", text: block.user.username).click

    expect(page).to have_heading(block.user.username)
    expect(current_path).to eq user_path(block.user)
  end
end
