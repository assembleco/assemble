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
    :google_oauth2,
    ENV.fetch("GOOGLE_CLIENT_ID"),
    ENV.fetch("GOOGLE_CLIENT_SECRET"),
    scope: "email,profile,https://www.googleapis.com/auth/drive",
  )
end
