import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import OriginalHint from "components/hint"
import TabNavigation from "components/tab_navigation"

import CurlSnippet from "./snippets/curl"
import NodeSnippet from "./snippets/node"
import RubySnippet from "./snippets/ruby"
import PythonSnippet from "./snippets/python"

class CodeUsage extends React.Component {
  render() {
    return (
      <div>
        <Hint>
          You can also run this block from your terminal
          or an existing code base.
          To start, choose your preferred language.
        </Hint>

        <TabNavigation
          tabs={{
            "Curl": <CurlSnippet {...this.props} />,
            "Ruby": <RubySnippet {...this.props} />,
            "Python": <PythonSnippet {...this.props} />,
            "Node": <NodeSnippet {...this.props} />,
          }}
        />
      </div>
    );
  }
}

CodeUsage.propTypes = {
  run_block_url: PropTypes.string.isRequired,
  user_api_key: PropTypes.string.isRequired,
  input_data: PropTypes.object,
}

const Hint = styled(OriginalHint)`
  margin-bottom: 0.75rem;
`

export default CodeUsage;
