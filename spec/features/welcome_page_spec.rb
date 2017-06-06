# frozen_string_literal: true
require "rails_helper"

RSpec.feature "Welcome page" do
  scenario "signed-in user is redirected to root page" do
    sign_in create(:user)

    visit root_path

    expect(current_path).to eq(root_path)
  end
end
