/*
 * Variables:
 *  `block_id`: The database ID for the block that will be fetched
 */

import createRequest from "../create_request"

// TODO extract into a generic helper higher-order-function
const reducer = (state = {}, variables, data) => {
  return {
    ...state,
    blocks: blocksReducer(state.blocks, variables, data),
  }
}

// TODO extract into a generic helper higher-order-function
const blocksReducer = (state = {}, variables = {}, data = {}) => (
  variables.block_id
  ? {
      ...state,
      [variables.block_id]: blockReducer(state[variables.block_id], {}, data.block)
    }
  : state
)

// TODO this should be the only reducer logic remaining in this file
const blockReducer = (state = {}, _variables, data) => {
  const input_data = data.initial_input_data
  const input_json = JSON.stringify(input_data, null, 2)

  return { ...state, ...data, input_json }
}

const query = `
query BlockQuery ($block_id: ID!) {
  block(id: $block_id) {
    created_at
    description
    editable
    id
    initial_input_data
    name
    source

    author {
      handle
    }

    subscription {
      ...subscription
    }
  }

  credentialed_services {
    id
    name
    domain
  }
}

fragment subscription on Subscription {
  active
  data_overrides
  id
  trigger_options

  authentication {
    id
  }

  trigger {
    ...trigger
  }
}

fragment trigger on Trigger {
  id
  name
  description
  options_schema
  sample_data

  service {
    name
    domain
    oauth_provider
  }
}
`

export default createRequest({ query, reducer, key: "block" })
