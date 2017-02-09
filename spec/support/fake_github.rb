class FakeGitHub

end

module FakeGitHubHelpers
  def stub_block_schema(block, schema)
    skip "stub_block_schema has not been implemented"
  end

  def stub_block_body(block, schema)
    skip "stub_block_body has not been implemented"
  end
end

RSpec.configure do |config|
  config.include FakeGitHubHelpers
end
