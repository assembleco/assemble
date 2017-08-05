// Returns a function that executes the request.
// The returned function accepts the request variables as arguments.
//
// TODO In the future,
//      we can validate that the correct variables are provided to the request
//      by adding an optional `requiredVariables` argument to this function,
//      and augmenting the logic in the returned function to check
//      that those variables are provided
const createRequest = ({ query, reducer, key }) => {
  const request = (variables) => (dispatch) => {
    dispatch({
      type: `request/${key}`,
      variables: variables,
    })

    return new Promise((resolve, reject) => {
      let request=new XMLHttpRequest();
      let body = JSON.stringify({ query: query, variables: variables })

      request.open("POST", "/api", true);
      request.setRequestHeader("Content-Type", "application/json");
      request.send(body);

      request.onreadystatechange = () => {
        if (request.readyState === 4)
          resolve(JSON.parse(request.responseText))
      }
    }).then((response) => dispatch({
      type: `response/${key}`,
      response: response.data,
      variables: variables,
    }))
  }

  request.key = key;

  request.reducer = (state = {}, action) => {
    if(action.type == `response/${key}`)
      return reducer(state, action.variables, action.response)
    else
      return reducer(state, {}, {})
  }

  return request
}

export default createRequest
