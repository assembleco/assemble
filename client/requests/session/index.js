/*
 * No variables
 */

import query from "./query"

const reducer = (state, variables, response) => (
  // TODO extract this error-handling logic into the calling function
  response.error
  ? { ...state, error: response.error }
  : { ...state, session: response.session }
)

export default { query, reducer, name: "session" }
