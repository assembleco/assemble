# Assemble

We want to make it easy for anyone to create an app –
whether you know how to code or not.

Choose from thousands of community-made building blocks,
and string them together to create the app you’ve always wanted.

## Documentation

Docs and usage information are currently stored in the team's Notion project.
When we open the application up for alpha users,
we'll release the documentation more publicly.

## Development

After you have cloned this repo,
run this setup script to set up your machine
with the necessary dependencies to run and test this app:

    % ./bin/setup

It assumes you have a machine equipped with Ruby, Postgres, etc.
If not, set up your machine with [this script].

[this script]: https://github.com/thoughtbot/laptop

After setting up, you can run the application using [Heroku Local]:

    % heroku local

[Heroku Local]: https://devcenter.heroku.com/articles/heroku-local

### Testing Assemble on your local machine

In order for Assemble to use your development machine as the server,
you'll need to use a tool like [ngrok](https://ngrok.com/)
to create a public tunnel to your local application.
When you have a public-facing URL,
update the `APPLICATION_HOST` environment variable in `.env`
to point to the public URL.

## Configure Assemble on Your Local Development Environment

1. After cloning the repository, run the setup script

    `./bin/setup`

1. Make sure that postgres, and redis, are both installed and running locally.

1. Log into your GitHub account and go to your [developer application settings].

1. Under the Developer applications panel - Click on "Register new application"
   and fill in the details:

    * Application Name: Assemble Development
    * Homepage URL: `http://localhost:3000`
    * Authorization Callback URL: `http://localhost:3000`

1. On the confirmation screen, copy the `Client ID` and `Client Secret` to
   `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` in the `.env.local` file.

1. Run `foreman start`. Foreman will start the web server and the resque
   background job queue. **NOTE**: `rails server` will not load the appropriate
   environment variables and you'll get a "Missing `secret_key_base` for
   'development' environment" error. Similarly, `heroku local` and `forego start`
   will fail to properly load `.env.local`.

1. Open `localhost:3000` in a browser.

## Setup Ngrok to Allow Webhooks

Ngrok allows Assemble to receive webhooks from GitHub. If you'd like to develop or
test a feature involving GitHub sending a pull request notification to your
local Assemble server you'll need to have ngrok or something similar set up.

To get started with ngrok, sign up for an [ngrok] account and configure ngrok
locally by installing ngrok and running:

    `ngrok authtoken <your-token>`

1. Launch ngrok on port 3000 (we recommend running ngrok with a custom subdomain
   for easy and persistent configuration, but this requires a paid ngrok account.
   You can still run Assemble with a free ngrok account, but it will require keeping
   the GitHub developer application configuration and your  `.env.local` files up
   to date if your ngrok subdomain changes).

 * If you're using a custom subdomain:

    `ngrok http -subdomain=<your-initials>-assemble 3000`

 * If you're using a free ngrok plan:

    `ngrok http 3000`

1. Set the `HOST` variable in your `.env.local` to your ngrok host, e.g.
   `<your-subdomain>.ngrok.io`.

1. Change `ENABLE_HTTPS` to 'yes' in the `.env.local` file.

1. Log into your GitHub account and go to your [developer application settings].

1. Under the Developer applications panel - Click on "Register new
   application" and fill in the details:

    * Application Name: Assemble Development
    * Homepage URL: `https://<your-subdomain>.ngrok.io`
    * Authorization Callback URL: `https://<your-subdomain>.ngrok.io`

1. On the confirmation screen, copy the `Client ID` and `Client Secret` to
   `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` in the `.env.local` file.

1. Run `foreman start`. Foreman will start the web server and the resque
   background job queue. **NOTE**: `rails server` will not load the appropriate
   environment variables and you'll get a "Missing `secret_key_base` for
   'development' environment" error. Similarly, `heroku local` and `forego start`
   will fail to properly load `.env.local`.

1. Open `https://<your-subdomain>.ngrok.io` in a browser.

[ngrok]: https://ngrok.com
[personal access token]: https://github.com/settings/tokens
[developer application settings]: https://github.com/settings/developers

## Guidelines

Use the following guides for getting things done, programming well, and
programming in style.

* [Protocol](http://github.com/thoughtbot/guides/blob/master/protocol)
* [Best Practices](http://github.com/thoughtbot/guides/blob/master/best-practices)
* [Style](http://github.com/thoughtbot/guides/blob/master/style)

## Deploying

If you have previously run the `./bin/setup` script,
you can deploy to staging and production with:

    $ ./bin/deploy staging
    $ ./bin/deploy production
