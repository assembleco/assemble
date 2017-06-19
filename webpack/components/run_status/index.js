import React from "react"
import PropTypes from "prop-types"
import $ from "jquery"
import styled from "styled-components"

import colors from "styles/colors"

class RunStatus extends React.Component {
  render() {
    if(this.props.status == "pending")
      return(
        <Message id="pending" style={backgroundColors[this.props.status]} >
          Run is pending...
        </Message>
      );
    else
      return (
        <div id={this.props.status} style={backgroundColors[this.props.status]} >
          <Message>
            Run completed – {this.props.status}
          </Message>

          <div>
            <Message>Output:</Message>

            <Code>
            {this.props.output}
            </Code>
          </div>

          <div>
            <Message>Errors:</Message>

            <Code>
            {this.props.errors}
            </Code>
          </div>
        </div>
      );
  }
}

const backgroundColors = {
  pending: { backgroundColor: colors.yellow },
  success: { backgroundColor: colors.green },
  failure: { backgroundColor: colors.red }
}

RunStatus.propTypes = {
  status: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  output: PropTypes.string,
  errors: PropTypes.string,
}

const Message = styled.div`
  margin-bottom: 1.5rem;
`

const Code = styled.pre`
  overflow-x: scroll;
  width: 20rem;
`

export default RunStatus;
