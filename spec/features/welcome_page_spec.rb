# frozen_string_literal: true
require "rails_helper"

RSpec.feature "Welcome page" do
  xscenario "user signs in", :js do
    user = create(:user, handle: "foobar")
    stub_authentication(user)

    visit root_path
    click_on "Sign in with GitHub"

    expect(page).to have_content t("sessions.create.success", name: "foobar")
  end

  xscenario "user signs up", :js do
    user = build_stubbed(:user, handle: "foobar")
    stub_authentication(user)

    visit root_path
    click_on "Sign in with GitHub"

    expect(page).to have_content t("sessions.create.success", name: "foobar")
  end

  scenario "signed-in user is redirected to root page" do
    sign_in create(:user)

    visit root_path

    expect(current_path).to eq(root_path)
  end
end
