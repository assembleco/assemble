# frozen_string_literal: true
require "rails_helper"

RSpec.feature "Header" do
  scenario "non-signed in user cannot access links" do
    visit root_path

    expect(page).not_to have_link("Explore")
    expect(page).not_to have_link("My Apps")
  end
end
