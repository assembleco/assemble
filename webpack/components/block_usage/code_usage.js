import React from "react"
import PropTypes from "prop-types"

import Hint from "components/hint"

import CurlSnippet from "./snippets/curl"

class CodeUsage extends React.Component {
  render() {
    return (
      <div>
        <Hint>
          You can also run this block from your terminal
          or an existing code base.
          To start, choose your preferred language.
        </Hint>

        <CurlSnippet {...this.props} />
      </div>
    );
  }
}

CodeUsage.propTypes = {
  run_block_url: PropTypes.string.isRequired,
  user_api_key: PropTypes.string.isRequired,
  input_data: PropTypes.object,
}

export default CodeUsage;
