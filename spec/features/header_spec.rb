# frozen_string_literal: true
require "rails_helper"

RSpec.feature "Header" do
  scenario "user navigates to explore page" do
    user = sign_in create(:user)

    visit root_path
    click_on t("header.explore")

    expect(page).to have_content("Explore All Apps")
  end

  scenario "user navigates to 'My Apps'" do
    user = create(:user)

    sign_in user
    visit root_path
    click_on t("header.my_apps")

    expect(page).to have_content("Apps > #{user.username}")
  end

  scenario "user navigates to 'My Blocks'" do
    user = create(:user)

    sign_in user
    visit root_path
    click_on t("header.my_blocks")

    expect(page).to have_content("Blocks > #{user.username}")
  end

  scenario "non-signed in user cannot access links" do
    visit root_path

    expect(page).not_to have_link("Explore")
    expect(page).not_to have_link("My Apps")
  end
end
