source "https://rubygems.org"

ruby "2.4.0"

gem "autoprefixer-rails"
gem "bourbon"
gem "coderay"
gem "delayed_job_active_record"
gem "docker-api"
gem "flutie"
gem "honeybadger"
gem "json-schema"
gem "neat"
gem "normalize-rails", "~> 3.0.0"
gem "octicons_helper"
gem "octokit"
gem "omniauth-github"
gem "pg"
gem "puma"
gem "rack-canonical-host"
gem "rails", "~> 5.0.1"
gem "recipient_interceptor"
gem "rufus-scheduler"
gem "sass-rails", "~> 5.0"
gem "simple_form"
gem "skylight"
gem "sprockets", ">= 3.0.0"
gem "suspenders"
gem "title"
gem "uglifier"
gem "webpack-rails"

group :development do
  gem "listen"
  gem "web-console"
end

group :development, :test do
  gem "awesome_print"
  gem "bullet"
  gem "bundler-audit", ">= 0.5.0", require: false
  gem "dotenv-rails"
  gem "factory_girl_rails"
  gem "pry-byebug"
  gem "pry-rails"
  gem "rspec-rails", "~> 3.5.0.beta4"
end

group :development, :staging do
  gem "rack-mini-profiler", require: false
end

group :test do
  gem "database_cleaner"
  gem "formulaic"
  gem "fuubar"
  gem "launchy"
  gem "poltergeist"
  gem "shoulda-matchers"
  gem "simplecov", require: false
  gem "timecop"
  gem "webmock"
end

group :staging, :production do
  gem "rack-timeout"
  gem "rails_stdout_logging"
end
