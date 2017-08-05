const selectors = {
  input_json: id => state => state.block.blocks[id].input_json,
}

const appReducer = (state = { blocks: undefined }, action) => (
  {
    ...state,
    blocks: blocksReducer(state.blocks, action),
    fetching: fetchingReducer(state.fetching, action),
    // TODO session: sessionReducer(state.session, action),
  }
)

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
    return {
      ...state,
      [action.variables.id]: blockReducer(state[action.variables.id], action),
    }
  }

  return state
}

const blockReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_INPUT_JSON":
      return { ...state, input_json: action.input_json }

    default:
      return state
  }
}

export default { appReducer, selectors }
