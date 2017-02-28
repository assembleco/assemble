# frozen_string_literal: true
require "rails_helper"

RSpec.feature "Header" do
  scenario "user navigates to explore page" do
    user = sign_in create(:user)

    visit root_path
    click_on "Assemble"

    expect(page).to have_content("Explore All Blocks")
  end

  scenario "user navigates to 'My Blocks'" do
    user = create(:user)

    sign_in user
    visit root_path
    click_on t("header.my_blocks")

    expect(page).to have_content("#{user.handle}'s blocks")
  end

  scenario "non-signed in user cannot access links" do
    visit root_path

    expect(page).not_to have_link("Explore")
    expect(page).not_to have_link("My Apps")
  end
end
