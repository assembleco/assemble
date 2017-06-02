import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Hint from "components/hint"
import Section from "components/section"
import Toggle from "react-toggle"
import updateBlock from "util/update_block"

class OnOffSwitch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: this.props.active,
    }
  }

  render() {
    const editable = (this.props.current_user.id == this.props.user.id)

    if(!editable)
      return null;

    return(
      <Section>
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
      </Section>
    );
  }

  activeChanged(event) {
    this.setState({ active: event.target.checked })

    updateBlock(
      { active: event.target.checked },
      this.props.user.handle,
      this.props.name,
    )
  }
}

OnOffSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  current_user: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
}

export default OnOffSwitch;
