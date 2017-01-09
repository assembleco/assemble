# frozen_string_literal: true
require "rails_helper"

RSpec.feature "Explore page" do
  xscenario "user sees popular apps" do
    user = create(:user)
    create(:app, name: "App 1")

    sign_in user
    visit explore_path

    expect(page).to have_content("App 1")
  end

  xscenario "user sees popular building blocks" do
    user = create(:user)
    create(:block, name: "Building Block 1")

    sign_in user
    visit explore_path

    expect(page).to have_content("Building Block 1")
  end
end
