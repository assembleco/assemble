import Immutable from "immutable"

const initialState = Immutable.Map({
  fetching: false,
})

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_REQUEST":
      return state
        .set("fetching", true);

    case "FINISH_REQUEST":
      let reducer = requestReducers[action.request]
      return reducer(state.set("fetching", false), action)

    default:
      return state
  }
}

const ReduceInputDataRequest = (state, action) => {
  const input_data = action.response.data.block.initial_input_data
  const input_json = JSON.stringify(input_data, null, 2)

  return (
    state.set("blocks", Immutable.Map({
      [action.variables.id]: Immutable.Map({
        input_json: input_json
      })
    }))
  )
}

const ReduceInputJSONChange = (state, action) => {
  if(action.type == "CHANGE_INPUT_JSON")
    return (
      state.set("blocks", Immutable.Map({
        [action.variables.id]: Immutable.Map({
          input_json: input_json,
        })
      })
    )
  )
}

const requestReducers = {
  "block.input_data": ReduceInputDataRequest,
}

export default appReducer
