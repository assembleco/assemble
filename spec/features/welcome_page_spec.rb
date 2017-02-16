# frozen_string_literal: true
require "rails_helper"

RSpec.feature "Welcome page" do
  scenario "user sees a friendly greeting & description of the site" do
    visit root_path

    expect(page).to have_content t("welcome.index.greeting")
    expect(page).to have_content t("welcome.index.description.one")
    expect(page).to have_content t("welcome.index.description.two")
  end

  scenario "user signs in" do
    create(:user, handle: "foobar", password_digest: "password")

    visit root_path
    click_on "Sign in"
    fill_in :handle, with: "foobar"
    fill_in "Password", with: "password"
    click_button "Sign in"

    expect(page).to have_content t("sessions.create.success", name: "foobar")
  end

  scenario "user signs up" do
    visit root_path
    click_on "Sign up"
    fill_in "handle", with: "foobar"
    fill_in "Email", with: "foobar@example.com"
    fill_in "Password", with: "password"
    click_button "Sign up"

    expect(page).to have_content t("users.create.success", name: "foobar")
  end

  scenario "signed-in user is redirected to explore page" do
    sign_in create(:user)

    visit root_path

    expect(current_path).to eq(explore_path)
  end
end
