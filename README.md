# The App Factory

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

### Testing the App Factory on local machine

In order for the App Factory to use your development machine as the server,
you'll need to use a tool like [ngrok](https://ngrok.com/)
to create a public tunnel to your local application.
When you have a public-facing URL,
update the `APPLICATION_HOST` environment variable in `.env`
to point to the public URL.

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
