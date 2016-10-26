# Flows

Flows are small code snippets that run in response to events online.
They have defined input schemas,
store no state,
and run in isolated Docker containers.
There's no fussing around with servers or hosting,
no packages or dependencies to install,
and no more headaches.

## Define a Flow

At the moment flows must be written in Javascript,
with support for other languages coming soon.

```javascript
var flow = require('flow');

flow.trigger("slack/message", { message: "Running flow with: " + flow.input.message })
```

Each flow has defined input values, defined with json-schema.
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

You can run your flow in a custom Docker container.
There is planned support for creating a Docker container
by selecting a base image and running commands in a web UI.

### Set environment variables

You are allowed to set any variables you want for your script to execute.
They will be set in the flow's container as system environment variables.
Each flow has its own set of environment variables,
and they do not carry from one flow to another.

There will likely be two environment variables that can't be changed -
`FLOW_ID` and `FLOW_KEY`.
These tell flow who you are, and what flows you have access to run.
If you want to trigger other flows, you need to provide these values.

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
