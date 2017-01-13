require "rails_helper"

feature "Sandbox apps" do
  scenario "Testing out a block in a sandbox" do
    block = create(:block, environment: "ruby", body: <<-SCRIPT)
      require "json"
      input = JSON.parse(File.read("input.json"))
      puts "Received input message: \#{input['message']}"
      File.write("output.json", JSON.dump({ result: "baz" }))
    SCRIPT

    sign_in create(:user)
    visit block_path(block.user, block)
    fill_in "Input", with: '{ "message": "bar" }'
    click_on "Go"

    expect(page).to have_content("Success")
    click_on "Success"
    expect(page).to have_content("Received input message: bar")
    expect(page).to have_content('{ "result": "baz" }')
  end
end
