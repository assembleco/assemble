import React from "react"
import PropTypes from "prop-types"
import $ from "jquery"
import styled from "styled-components"

import colors from "styles/colors"
import Link from "components/link"

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

          <div>
            <Message>Output Files:</Message>

            <ul>
              {Object.keys(this.props.output_files).map((filename) => (
                <li>
                  <Link external to={this.props.output_files[filename]}>
                    {filename}
                  </Link>
                </li>
              )) }
            </ul>
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
