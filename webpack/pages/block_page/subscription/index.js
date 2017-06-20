import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { graphql, compose } from "react-apollo"
import $ from "jquery"

import Column from "layout/column"
import TriggerSetup from "./trigger_setup"
import Hint from "components/hint"
import Loading from "components/loading"
import Row from "layout/row"
import Section from "components/section"
import Form from "react-jsonschema-form"
import ToggleSwitch from "components/toggle_switch"

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
      id: props.id,
      trigger: props.trigger,
      trigger_options: props.trigger_options,
      data_overrides: props.data_overrides,
    }
  }

  render() {
    return(
      this.props.data.loading ? <Loading /> : (
        <Section>
          <h2>Choose a trigger for your block</h2>

          <Hint>
          Set up a trigger,
          and your block will run automatically whenever that event happens.
          </Hint>

          <Row>
            <Column>
              <select
                value={this.state.trigger ? this.state.trigger.id : "null"}
                onChange={this.triggerSelected.bind(this)}
                disabled={this.state.active && "disabled"}
                >
                <option key="null" value={null}>No trigger</option>

                { this.props.data.triggers.map((trigger) => (
                    <option key={trigger.id} value={trigger.id}>
                      {trigger.name} | {trigger.description}
                    </option>
                )) }
              </select>

              {this.state.trigger && this.renderDataOverrides()}
            </Column>

            {this.renderRightColumn()}
          </Row>

          { this.state.trigger && this.renderBottom() }
        </Section>
      )
    );
  }

  triggerSelected(event) {
    let trigger_index = parseInt(event.target.selectedOptions[0].value)
    let selected_trigger = this.props.data.triggers[trigger_index-1]

    if(selected_trigger) {
      let request = this.props.create_subscription({ variables: {
        trigger_id: parseInt(selected_trigger.id),
        block_id: parseInt(this.props.block_id),
      }})

      request.then(({ data }) => this.setState({
        trigger: selected_trigger,
        id: data.create_subscription.id,
        trigger_options: data.create_subscription.trigger_options,
      }))
    } else {
      let request = this.props.destroy_subscription({ variables: {
          subscription_id: this.state.id
      }})

      request.then(({ data }) => { this.setState({
        id: null,
        trigger: selected_trigger,
      }) })
    }
  }

  renderRightColumn() {
    if(this.state.trigger)
      return(
        <Column>
          <TriggerSetup
            {...this.state.trigger}
            options={this.state.trigger_options}
            settingUpdated={this.settingUpdated.bind(this)}
            editable={!this.state.active}
          />
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

  renderDataOverrides() {
    const uiSchema =  {
      ssh_private_key: {
        "ui:widget": "textarea"
      }
    };

    return (
      <div>
        <Hint>
        Override the block's input data here.
        The data you provide in this form will be passed to the block
        alongside the data from the trigger.
        </Hint>

        <Form
          uiSchema={uiSchema}
          schema={this.props.schema}
          onChange={ this.data_overrides_changed.bind(this) }
          formData={this.state.data_overrides}
          >
          <div style={{ position: "relative", overflow: "hidden" }}>
            <a onClick={() => this.data_overrides_changed({ formData: {} }) }>
              Clear input fields
            </a>
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

        { this.state.active
          ? <Hint>
              This block is currently listening for events from this trigger.
            </Hint>
          : <Hint>
              When you're happy with how your block is set up,
              turn it on and it will begin listening to events.
            </Hint>
        }

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

const trigger_prop_types = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  options_schema: PropTypes.object.isRequired,
  data_schema: PropTypes.object.isRequired,

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
