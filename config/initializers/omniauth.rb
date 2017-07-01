Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer unless Rails.env.production?

  provider(
    :github,
    ENV.fetch("GITHUB_CLIENT_ID"),
    ENV.fetch("GITHUB_CLIENT_SECRET"),
    scope: "user:email,admin:repo_hook",
  )

  provider(
    :slack,
    ENV.fetch("SLACK_CLIENT_ID"),
    ENV.fetch("SLACK_CLIENT_SECRET"),
    scope: "commands",
  )

  provider(
    :bitbucket,
    ENV["BITBUCKET_KEY"],
    ENV["BITBUCKET_SECRET"],
    scope: "repository,email,webhook",
  )
end
