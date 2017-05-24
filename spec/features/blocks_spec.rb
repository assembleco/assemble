# frozen_string_literal: true
require "rails_helper"

RSpec.feature "Blocks" do
  scenario "create a block" do
    user = create(:user)

    sign_in user
    visit new_block_path
    fill_in :block_name, with: "Hello"
    fill_in :block_description, with: "This block says hello."
    fill_in :block_source, with: "Hello"
    fill_in :block_source_path, with: "Hello"
    fill_in :block_command, with: "Hello"
    fill_in :block_dockerfile, with: "Hello"
    click_on "Create Block"

    expect(page).to have_content t("blocks.create.success")
    expect(page).to have_content "This block says hello."
  end

  scenario "update a block" do
    block = create(:block)
    user = block.user

    sign_in user
    visit edit_block_path(block.user, block)
    fill_in :block_description, with: "This block says hello."
    click_on "Update Block"

    expect(page).to have_content t("blocks.update.success")
    expect(page).to have_content "This block says hello."
  end

  scenario "navigating to a block's author" do
    block = create(:block)

    sign_in create(:user)
    visit block_path(block.user, block)
    first("a", text: block.user.handle).click

    expect(page).to have_heading(block.user.handle)
    expect(current_path).to eq user_path(block.user)
  end
end
