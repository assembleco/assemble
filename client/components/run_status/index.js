import React from "react"
import PropTypes from "prop-types"
import $ from "jquery"
import styled from "styled-components"

import colors from "styles/colors"

class RunStatus extends React.Component {
  render() {
    if(this.props.status == "pending")
      return(
        <Message id="pending" style={messageColors[this.props.status]} >
          Run is pending...
        </Message>
      );
    else
      return (
        <div id={this.props.status} >
          <Message style={messageColors[this.props.status]} >
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

const messageColors = {
  pending: { color: colors.yellow },
  success: { color: colors.green },
  failure: { color: colors.red }
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
`

export default RunStatus;
