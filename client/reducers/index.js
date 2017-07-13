const selectors = {
  input_json: id => state => state.app.blocks[id].input_json,
}

const rootReducer = (state = { app: undefined }, action) => (
  appReducer(state, action)
)

const appReducer = (state = { blocks: undefined }, action) => {
  return Object.assign(
    {},
    state,
    { blocks: blocksReducer(state.blocks, action) },
    { fetching: fetchingReducer(state.fetching, action) },
  )
}

const fetchingReducer = (state = false, action) => {
  switch (action.type) {
    case "START_REQUEST":
      return true

    case "FINISH_REQUEST":
      return false
  }
}

const blocksReducer = (state = {}, action) => {
  if(action.variables && action.variables.id) {
    return Object.assign(
      {},
      state,
      { [action.variables.id]: blockReducer(state[action.variables.id], action) },
    )
  }

  return state
}

const blockReducer = (state = {}, action) => {
  switch (action.type) {
    case "FINISH_REQUEST":
      let reducer = requestReducers[action.request]
      return reducer(state, action)

    case "CHANGE_INPUT_JSON":
      return Object.assign({}, state, { input_json: action.input_json })

    default:
      return state
  }
}

const ReduceInputDataRequest = (state = {}, action) => {
  const input_data = action.response.data.block.initial_input_data
  const input_json = JSON.stringify(input_data, null, 2)

  return Object.assign({}, state, { input_json })
}

const requestReducers = {
  "block.input_data": ReduceInputDataRequest,
}

export default { rootReducer, selectors }
