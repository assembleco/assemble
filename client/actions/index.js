const requestStart = (query_key, variables) => ({
  type: "START_REQUEST",
  request: query_key,
  variables: variables,
})

const requestEnd = (query_key, variables, response) => ({
  type: "FINISH_REQUEST",
  request: query_key,
  variables: variables,
  response: response,
})

const queries = {
  "block.input_data": `query ($id: ID!) { block(id: $id) { initial_input_data } }`,
}

const getGraph = (query_key, variables) => (dispatch) => {
  dispatch(requestStart(query_key, variables));

  return new Promise(function(resolve, reject) {
    let request=new XMLHttpRequest();

    request.open("POST", "/api", true);

    request.setRequestHeader("Content-Type", "application/json");

    request.send(JSON.stringify({
      query: queries[query_key],
      variables: variables,
    }));

    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        resolve(request.responseText)
      }
    }

  })
    .then(response => dispatch(requestEnd(
      query_key,
      variables,
      JSON.parse(response),
    )))
}

export default { getGraph }
