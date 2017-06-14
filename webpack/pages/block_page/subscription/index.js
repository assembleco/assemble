import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { graphql, compose } from "react-apollo"
import gql from "graphql-tag"

import Column from "layout/column"
import TriggerSetup from "./trigger_setup"
import Hint from "components/hint"
import Loading from "components/loading"
import Row from "layout/row"
import Section from "components/section"

class Subscription extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      trigger: props.trigger,
      id: props.id
    }
  }

  render() {
    return(
      this.props.data.loading ? <Loading /> : (
        <Section>
          <h2>Choose a trigger for your block</h2>

          <Hint>
          Set up a trigger,
          and your block ill run automatically henever that event happens.
          </Hint>

          <Row>
            <Column>
              <select
                value={this.state.trigger ? this.state.trigger.id : "null"}
                onChange={this.triggerSelected.bind(this)}
                >
                <option key="null" value={null}>No trigger</option>

                { this.props.data.triggers.map((trigger) => (
                    <option key={trigger.id} value={trigger.id}>
                      {trigger.name} | {trigger.description}
                    </option>
                )) }
              </select>
            </Column>

            {this.renderRightColumn()}
          </Row>
        </Section>
      )
    );
  }

  triggerSelected(event) {
    let trigger_index = parseInt(event.target.selectedOptions[0].value)
    let selected_trigger = this.props.data.triggers[trigger_index-1]

    this.setState({ trigger: selected_trigger });

    if(selected_trigger) {
      let request = this.props.create_or_update_subscription({ variables: {
        subscription_id: this.props.id,
        trigger_id: parseInt(selected_trigger.id),
        block_id: parseInt(this.props.block_id),
      }})

      request.then(({ data }) => { this.setState({ id: data.create_or_update_subscription.id }) })
    } else {
      let request = this.props.destroy_subscription({ variables: {
          subscription_id: this.state.id
      }})

      request.then(({ data }) => { this.setState({ id: null }) })
    }
  }

  renderRightColumn() {
    if(this.state.trigger)
      return(
        <Column>
          <TriggerSetup
            {...this.state.trigger}
            options={this.props.trigger_options}
          />
        </Column>
      );
    else
      return (
        <Column>
          <Hint>
            &lt;– Choose an event to get started.
            <br/>
            Or, continue ith a free-standing block.
          </Hint>
        </Column>
      );
  }
}

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

const dataQuery = gql`
  {
    triggers {
      id
      name
      description
      data_schema
      options_schema
      service {
        name
        domain
      }
    }
  }
`

const create_or_update_subscription = gql`
  mutation ($subscription_id: ID, $trigger_id: ID, $block_id: ID) {
    create_or_update_subscription(
        subscription_id: $subscription_id,
        trigger_id: $trigger_id,
        block_id: $block_id,
      ) {
      id
    }
  }
`

const destroy_subscription = gql`
  mutation destroy_subscription($subscription_id: ID!) {
    destroy_subscription(subscription_id: $subscription_id) {
      id
    }
  }
`

export default compose(
  graphql(dataQuery),
  graphql(create_or_update_subscription, { name: "create_or_update_subscription" }),
  graphql(destroy_subscription, { name: "destroy_subscription" }),
)(Subscription);
