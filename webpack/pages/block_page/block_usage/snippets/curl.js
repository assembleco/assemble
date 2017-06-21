import React from "react"
import PropTypes from "prop-types"

import SyntaxHighlighter from 'react-syntax-highlighter';

import Hint from "components/hint"

const CurlSnippet = (props) => {
  const data = {
    query: "mutation ($block_id: ID!, $data: ArbitraryObject!) { create_run(block_id: $block_id, data: $data) { id status stdout stderr } } ",
    variables: {
      block_id: "18",
      data: props.input_data
    }
  }

  return (
    <div>
    <Hint>
    Copy and paste this snippet into your computer's Terminal program.
    </Hint>

      <SyntaxHighlighter language="bash">
  {
    `curl \\\n\
    '${window.location.protocol}//${window.location.host}/api' \\\n\
    -X POST \\\n\
    -H "Content-Type: application/json" \\\n\
    -H "Accept: application/json" \\\n\
    -H "Authorization: Bearer ${props.user_api_key}" \\\n\
    -d '${JSON.stringify(data, null, 2)}'`
  }
      </SyntaxHighlighter>
    </div>
  );
}

CurlSnippet.propTypes = {
  run_block_url: PropTypes.string.isRequired,
  user_api_key: PropTypes.string.isRequired,
  input_data: PropTypes.object,
}

export default CurlSnippet;
