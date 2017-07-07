import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { graphql, compose } from "react-apollo"
import $ from "jquery"

import AuthenticationLink from "components/authentication_link"
import Column from "layout/column"
import Form from "react-jsonschema-form"
import Hint from "components/hint"
import Link from "components/link"
import Loading from "components/loading"
import Row from "layout/row"
import Section from "components/section"
import ToggleSwitch from "components/toggle_switch"
import TriggerSetup from "./trigger_setup"
import border from "styles/border"

import dataQuery from "graphql/triggers.gql"
import create_subscription from "graphql/create_subscription.gql"
import update_subscription from "graphql/update_subscription.gql"
import destroy_subscription from "graphql/destroy_subscription.gql"
import activate_subscription from "graphql/activate_subscription.gql"
import deactivate_subscription from "graphql/deactivate_subscription.gql"

class Subscription extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: props.active,
      authentication: props.authentication,
      id: props.id,
      trigger: props.trigger,
      trigger_options: props.trigger_options,
      data_overrides: props.data_overrides,
    }
  }

  render() {
    return(
      this.props.data.loading ? <Loading /> : (
        <FlexibleRow>
          <LeftColumn>
            <Section>
              <h2>Connect this block to an app</h2>

              <Hint>
              Choose an event from any app you use,<br/>
              and your block will run automatically whenever that event happens.
              </Hint>

              <select
                value={this.state.trigger ? this.state.trigger.id : "null"}
                onChange={this.triggerSelected.bind(this)}
                disabled={this.state.active && "disabled"}
                >
                <option key="null" value={null}>Not connected</option>

                { this.props.data.triggers.map((trigger) => (
                    <option key={trigger.id} value={trigger.id}>
                      {trigger.name} | {trigger.description}
                    </option>
                )) }
              </select>

              {this.renderTriggerSetup()}

              { this.isActivatable() && this.renderBottom() }
            </Section>
          </LeftColumn>

          {this.state.trigger && <RightColumn>{this.renderDataOverrides()}</RightColumn>}
        </FlexibleRow>
      )
    );
  }

  isActivatable() {
    return this.state.trigger && !this.missingAuthentication()
  }

  missingAuthentication() {
    return (
    this.state.trigger.service.oauth_provider &&
      this.state.authentication == null
    )
  }

  triggerSelected(event) {
    let trigger_id = parseInt(event.target.selectedOptions[0].value)

    if(trigger_id) {
      let request = this.props.create_subscription({ variables: {
        trigger_id: parseInt(trigger_id),
        block_id: parseInt(this.props.block_id),
      }})

      request.then(({ data }) => this.setState({
        trigger: data.create_subscription.trigger,
        id: data.create_subscription.id,
        trigger_options: data.create_subscription.trigger_options,
        authentication: data.create_subscription.authentication,
      }))
    } else {
      let request = this.props.destroy_subscription({ variables: {
          subscription_id: this.state.id
      }})

      request.then(({ data }) => { this.setState({
        id: null,
        trigger: null,
        authentication: null,
      }) })
    }
  }

  renderTriggerSetup() {
    if(this.state.trigger)
      return(
        this.missingAuthentication()
        ? <AuthenticationLink {...this.state.trigger.service} />
        : <TriggerSetup
            {...this.state.trigger}
            options={this.state.trigger_options}
            settingUpdated={this.settingUpdated.bind(this)}
            editable={!this.state.active}
          />
      );
  }

  renderDataOverrides() {
    const uiSchema =  {
      ssh_private_key: {
        "ui:widget": "textarea"
      }
    };

    return (
      <div>
        <Hint>
        If there are any input fields not provided
        by the {this.state.trigger.service.name} {this.state.trigger.name} event,
        pass them in here.
        </Hint>

        <Form
          uiSchema={uiSchema}
          schema={this.props.schema}
          onChange={ this.data_overrides_changed.bind(this) }
          formData={this.state.data_overrides}
          >
          <div style={{ position: "relative", overflow: "hidden" }}>
            <Link external onClick={() => this.data_overrides_changed({ formData: {} }) }>
              Clear input fields
            </Link>
          </div>
        </Form>
      </div>
    )
  }

  renderBottom() {
    return (
      <Footer>
        <label>
          <ToggleSwitch
            onChange={this.activeChanged.bind(this)}
            checked={this.state.active || false}
            />

          <OnOffLabel>
            {this.state.active ? "Active" : "Inactive" }
          </OnOffLabel>
        </label>

        <Hint>
          { this.state.active
          ? "This block is currently listening"
          : "When you're happy with how your block is set up, turn it on and it will begin listening"
          }
          for events from {this.state.trigger.service.name}
        </Hint>
      </Footer>
    )
  }

  activeChanged(event) {
    if(event.target.checked) {
      this.setState({ active: true })

      this.props.activate_subscription({ variables: {
        subscription_id: this.state.id,
      }})
    } else {
      this.setState({ active: false })

      this.props.deactivate_subscription({ variables: {
        subscription_id: this.state.id,
      }})
    }
  }

  data_overrides_changed(event) {
    this.setState({ data_overrides: event.formData })

    this.props.update_subscription({ variables: {
      subscription_id: parseInt(this.state.id),
      data_overrides: event.formData,
    }})
  }

  settingUpdated(settingName, newValue) {
    let new_options = $.extend(true, {}, this.state.trigger_options);
    new_options[settingName] = newValue;

    let request = this.props.update_subscription({ variables: {
      subscription_id: parseInt(this.state.id),
      trigger_id: parseInt(this.state.trigger.id),
      trigger_options: new_options,
    }})

    request.then(({ data }) => this.setState({
      id: data.update_subscription.id,
      trigger_options: data.update_subscription.trigger_options,
    }))
  }
}

const Footer = styled.div`
  border-top: 1px solid lightgrey;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
`

const OnOffLabel = styled.span`
  margin-left: 1.5rem;
`

const FlexibleRow = styled(Row)`
  align-items: flex-start;
`

const LeftColumn = styled(Column)`
  margin-right: 0;
  width: 50%;
`

const RightColumn = styled(Column)`
  padding: 1.5rem;
  background-color: #ffffff;
  border: ${border};
  border-left: none;
  width: 50%;
`

const trigger_prop_types = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  options_schema: PropTypes.object.isRequired,

  service: PropTypes.shape({
    name: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
  }),
})

Subscription.propTypes = {
  id: PropTypes.string,
  trigger: trigger_prop_types,

  trigger_options: PropTypes.object,
  block_id: PropTypes.string.isRequired,

  data: PropTypes.shape({ triggers: PropTypes.arrayOf(trigger_prop_types) })
}

export default compose(
  graphql(dataQuery),
  graphql(create_subscription, { name: "create_subscription" }),
  graphql(update_subscription, { name: "update_subscription" }),
  graphql(destroy_subscription, { name: "destroy_subscription" }),
  graphql(activate_subscription, { name: "activate_subscription" }),
  graphql(deactivate_subscription, { name: "deactivate_subscription" }),
)(Subscription);
