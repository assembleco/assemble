import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { gql, graphql } from "react-apollo";

import Hint from "components/hint"
import Toggle from "react-toggle"

class OnOffSwitch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: this.props.active,
    }
  }

  render() {
    if(!this.props.editable)
      return null;

    return(
      <div>
        <label>
          <Toggle
            onChange={this.activeChanged.bind(this)}
            checked={this.state.active}
            />
            {this.state.active ? "On" : "Off"}
        </label>

        <Hint>
        When you're happy with how your block is set up,
        turn it on and it will begin listening to events.
        </Hint>
      </div>
    );
  }

  activeChanged(event) {
    if(event.target.checked)
      this.props.activate()
    else
      this.props.deactivate()

    updateBlock(
      { active: event.target.checked },
      this.props.id,
    )
  }
}

const activate = gql`
mutation {
  deactivate_subscription(subscription_id:2) {
    id
  }
}
`

const deactivate = gql`
mutation ($opts: ArbitraryObject!) {
  activate_subscription(block_id: 21, trigger_id: 1, trigger_options: $opts) {
    id
  }
}
`

const ComponentWithMutations =
  graphql(activate, { name: "activate" })(
  graphql(deactivate, { name: "deactivate" })(OnOffSwitch)
  )

OnOffSwitch.propTypes = {
  active: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
}

export default OnOffSwitch;
