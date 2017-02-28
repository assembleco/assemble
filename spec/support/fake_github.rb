class FakeGitHub

end

module FakeGitHubHelpers
  def stub_block_schema(block, schema)
    skip "stub_block_schema has not been implemented"
  end

  def stub_block_body(block, schema)
    skip "stub_block_body has not been implemented"
  end

  def stub_github_email(email)
    fake_github = double("fake_github_client")
    allow(fake_github).to receive(:emails).and_return(
      [{
        email: 'foo@example.com',
        primary: true,
      }]
    )

    allow(Octokit::Client).to receive(:new).and_return(fake_github)
  end
end

RSpec.configure do |config|
  config.include FakeGitHubHelpers
end
