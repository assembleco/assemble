# frozen_string_literal: true
require "rails_helper"

RSpec.feature "Explore page" do
  scenario "user can click through to popular building blocks" do
    user = create(:user)
    block = create(:block, name: "Building Block 1")

    sign_in user
    visit root_path
    click_on "Building Block 1"

    expect(current_path).to eq block_path(block.claim, block)
    expect(page).to have_heading(block.name)
  end
end
