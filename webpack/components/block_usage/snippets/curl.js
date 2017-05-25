import React from "react"
import PropTypes from "prop-types"

import Hint from "components/hint"

class CurlSnippet extends React.Component {
  render() {
    return (
      <div>
        <Hint>
        Copy and paste this snippet into your computer's Terminal program.
        </Hint>

        <pre>
{
  `curl \\\n\
  '${ this.props.run_block_url }.json' \\\n\
  -X POST \\\n\
  -H "Content-Type: application/json" \\\n\
  -H "Accept: application/json" \\\n\
  -H "Authorization: Bearer ${this.props.user_api_key}" \\\n\
  -d '${JSON.stringify({ data: this.props.input_data }, null, 2)}'`
}
        </pre>
      </div>
    );
  }
}

CurlSnippet.propTypes = {
  run_block_url: PropTypes.string.isRequired,
  user_api_key: PropTypes.string.isRequired,
  input_data: PropTypes.object,
}

export default CurlSnippet;
