import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Section from "components/section"
import Hint from "components/hint"

import Column from "layout/column"
import Row from "layout/row"

import EventSetup from "./event_setup"

class SelectAnEvent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      eventChecked: false,
    }
  }

  render() {
    return(
      <Section>
        <h2>When should your block run?</h2>

        <Row>
          <Column>
            <Hint>
            <p>
              At the moment we only support this one, lonely event.
              Soon, we'll support events from all over the web –
              Facebook posts, Slack conversations, Twitter tweets...
              You get the idea.
              </p>

              <p>
              Check out <a href="https://github.com/assembleapp/registry/issues/11">the GitHub issue</a>
              &nbsp;for further discussion.
              </p>
            </Hint>

            <label>
              <input
                type="checkbox"
                checked={this.state.eventChecked}
                onChange={this.eventToggleChanged.bind(this)}
                />
              <span>New GitHub Commit</span>
            </label>
          </Column>

          {this.renderRightColumn()}
        </Row>
      </Section>
    );
  }

  eventToggleChanged() {
    this.setState({ eventChecked: !this.state.eventChecked });
  }

  renderRightColumn() {
    if(this.state.eventChecked)
      return(
        <Column>
          <EventSetup/>
        </Column>
      );
    else
      return (
        <Column>
          <Hint>
            &lt;– Choose an event to get started.
            <br/>
            Or, continue with a free-standing block.
          </Hint>
        </Column>
      );
  }
}

export default SelectAnEvent;
