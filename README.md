# The App Factory

We want to make it easy for anyone to create an app –
whether you know how to code or not.

Choose from thousands of community-made building blocks,
and string them together to create the app you’ve always wanted.

## Define an App

At the moment building blocks must be written in Javascript,
with support for other languages coming soon.

```javascript
var flow = require('flow');

flow.trigger("slack/message", { message: "Running flow with: " + flow.input.message })
```

Each building block has defined input values, defined with json-schema.
It is likely that the implementation will switch to protocol buffers
to better support versioned schemas.

```javascript
// The Flow library is included in the same directory as your flow -
const flow = require("flow")

slack_slash_command = flow.input

user = slack_slash_command.handle

flow.trigger("slack/message", { contents: handle + " says hi" })
flow.trigger("google/sheets.insert_row", [ handle ] )
```

### Define your own container

You can run your building block in a custom Docker container.
There is planned support for creating a Docker container
by selecting a base image and running commands in a web UI.

### Set environment variables

You are allowed to set any variables you want for your script to execute.
They will be set in the building block's container
as system environment variables.
Each building block has its own set of environment variables,
and they do not carry from one building block to another.

There will likely be two environment variables that can't be changed -
`APP_FACTORY_ID` and `APP_FACTORY_KEY`.
These tell the App Factory who you are,
and what building blocks you have access to run.
If you want to trigger other building blocks,
you need to provide these values.

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
