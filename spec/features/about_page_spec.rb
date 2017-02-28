require "rails_helper"

RSpec.feature "Welcome page" do
  scenario "user sees a friendly greeting & description of the site" do
    visit about_path

    expect(page).to have_content t("about.index.greeting")
    expect(page).to have_content t("about.index.description.one")
    expect(page).to have_content t("about.index.description.two")
  end
end
