# frozen_string_literal: true
require "rails_helper"

RSpec.feature "Apps" do
  scenario "creation" do
    sign_in create(:user)

    visit new_app_path
    fill_in :app_name, with: "Say Hello"
    fill_in :app_description, with: "This app simply says hello"
    click_on "Create App"

    expect(page).to have_content t("apps.create.success")
    expect(page).to have_content "Say Hello"
    expect(page).to have_content "This app simply says hello"
  end

  scenario "creation with errors" do
    sign_in create(:user)

    visit new_app_path
    fill_in :app_description, with: "We left the name blank!"
    click_on "Create App"

    expect(page).to have_content t("apps.create.failure")
  end

  scenario "subscribing to an existing feed", :js do
    user = sign_in create(:user)
    feed = create(:feed, name: "Every day at midnight")

    visit app_path(user, user.sandbox_app)
    select(feed.name)

    expect(page).to have_css(".app-canvas-entry-feed", text: feed.name)
  end

  scenario "connecting a block to a feed", :js do
    user = sign_in create(:user)
    block = create(:block)
    feed = create(:feed)
    create(:subscription, feed: feed, app: user.sandbox_app)

    visit app_path(user, user.sandbox_app)
    expect(page).not_to have_block(block.name)
    select(block.name)

    expect(page).to have_block(block.name)
  end

  scenario "connecting a block to a block", :js do
    user = sign_in create(:user)
    block_1 = create(:block)
    block_2 = create(:block)
    feed = create(:feed)
    create(:subscription, feed: feed, app: user.sandbox_app)
    create(:connection, source: feed, destination: block_1, app: user.sandbox_app)

    visit app_path(user, user.sandbox_app)
    expect(page).not_to have_block(block_2.name)
    select(block_2.name)

    expect(page).to have_block(block_2.name)
  end

  scenario "publishing a new feed"

  scenario "update" do
    app = create(:app)
    user = app.user

    sign_in user
    visit edit_app_path(user, app)
    fill_in :app_name, with: "Say Hello"
    fill_in :app_description, with: "This app says hello."
    click_on "Update App"

    expect(page).to have_content t("apps.update.success")
    expect(page).to have_content "Say Hello"
    expect(page).to have_content "This app says hello."
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

  def have_block(block_name)
    have_css(".app-canvas-block-element", text: block_name)
  end
end
