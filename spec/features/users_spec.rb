require "rails_helper"

feature "Users" do
  scenario "edit profile information" do
    user = create(:user)

    sign_in user
    visit user_path(user)
    click_on "Edit profile"
    fill_in "Bio", with: "I'm a test user"
    fill_in "Location", with: "Oakland, CA"
    fill_in "Website", with: "example.com"
    click_on "Update Profile"

    expect(page).to have_content t("users.update.success", name: user.username)
    expect(page).to have_content "I'm a test user"
    expect(page).to have_content "Oakland, CA"
    expect(page).to have_link "example.com"
  end

  scenario "cannot edit someone elses' profile" do
    other_user = create(:user)

    sign_in create(:user)
    visit user_path(other_user)

    expect(page).not_to have_link "Edit profile"
  end

  scenario "user links to external site" do
    user = create(:user, website: "example.com")

    sign_in create(:user)
    visit user_path(user)
    click_on "example.com"

    expect(current_url).to eq("http://example.com/")
  end
end
