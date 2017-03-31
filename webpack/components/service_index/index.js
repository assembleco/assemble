import React from "react"
import Radium from "radium"

import Service from "components/service"

class ServiceIndex extends React.Component {
  render() {
    return (
      <div>
        <div className="section layout-center">
          <h1>Connect a Service</h1>

          <p>
          Services let you connect your blocks to other applications.
          </p>

          <p className="hint">
          Right now we only support a select few services.
          We're working to define an API so that any developer can add their own service.
          For more information, please see <a href="https://github.com/assembleapp/registry/issues/4">the discussion on GitHub</a>.
          </p>
        </div>

        <Service
        name="Slack"
        domain="slack.com"
        auth_route="/auth/slack"
        hint={`
          Trigger blocks based on Slash commands,
          and to send block output back into your team's Slack conversation.
        `}
        />

        <Service
        name="GitHub"
        domain="github.com"
        hint={`
          Trigger blocks whenever you push code,
          open issues or pull requests,
          or leave a comment.
        `}
        />
      </div>
    );
  }
}

ServiceIndex.propTypes = {
}

export default Radium(ServiceIndex);
