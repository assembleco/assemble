# frozen_string_literal: true
require "rails_helper"

RSpec.feature "Blocks" do
  scenario "update" do
    block = create(:block)
    user = block.user

    sign_in user
    visit edit_block_path(block.claim, block)
    fill_in :block_description, with: "This block says hello."
    click_on "Update Block"

    expect(page).to have_content t("blocks.update.success")
    expect(page).to have_content "This block says hello."
  end

  scenario "navigating to a block's author" do
    block = create(:block)

    sign_in create(:user)
    visit block_path(block.claim, block)
    first("a", text: block.user.handle).click

    expect(page).to have_heading(block.user.handle)
    expect(current_path).to eq user_path(block.user)
  end
end
