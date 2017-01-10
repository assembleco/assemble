# frozen_string_literal: true
require "rails_helper"

RSpec.feature "Apps" do
  scenario "creation" do
    user = sign_in create(:user)

    visit new_app_path
    fill_in :app_name, with: "Say Hello"
    fill_in :app_description, with: "This app simply says hello"
    click_on "Create App"

    expect(page).to have_content t("apps.create.success")
    expect(page).to have_content "Say Hello"
    expect(page).to have_content "This app simply says hello"
  end

  scenario "creation with errors" do
    user = sign_in create(:user)

    visit new_app_path
    fill_in :app_description, with: "We left the name blank!"
    click_on "Create App"

    expect(page).to have_content t("apps.create.failure")
  end

  scenario "apps index shows all of the current user's apps" do
    user = create(:app, name: "My app").user
    create(:app, name: "Other app")

    sign_in user
    visit user_apps_path(user)

    expect(page).to have_content("My app")
    expect(page).not_to have_content("Other app")
  end

  scenario "navigating to a app's author" do
    app = create(:app)

    sign_in create(:user)
    visit app_path(app.user, app)
    click_on app.user.username

    expect(page).to have_heading(app.user.username)
    expect(current_path).to eq user_path(app.user)
  end
end
