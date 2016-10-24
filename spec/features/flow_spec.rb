# frozen_string_literal: true
require "rails_helper"

RSpec.feature "Flow" do
  scenario "creation" do
    visit new_flow_path

    fill_in :flow_name, with: "Say Hello"
    fill_in :flow_body, with: "console.log('Hello');"
    click_on "Create Flow"

    expect(page).to have_content t("flows.create.success")
    expect(page).to have_content "Say Hello"
  end
end
