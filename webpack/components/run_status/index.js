import React from "react"
import PropTypes from "prop-types"
import $ from "jquery"
import styled from "styled-components"

import JSONTree from "react-json-tree";
import colors from "../../styles/colors"

class RunStatus extends React.Component {
  render() {
    if(this.props.status == "pending")
      return(
        <Container id="pending" style={backgroundColors[this.props.status]} >
          <Message>
            Run is pending...
          </Message>
        </Container>
      );
    else
      return (
        <Container id={this.props.status} style={backgroundColors[this.props.status]} >
          <Message>
            Run completed – {this.props.status}
          </Message>

          <div>
            Output:

            <JSONTree data={this.props.output} />
          </div>

          <div>
            Errors:
            <pre>
            {this.props.errors}
            </pre>
          </div>
        </Container>
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
  input: PropTypes.string.isRequired,
  output: PropTypes.string.isRequired,
  errors: PropTypes.string,
}

const Container = styled.div`
  padding: 0.75rem;
  margin-bottom: 1.5rem;
`

const Message = styled.div`
  margin-bottom: 1.5rem;
`

export default RunStatus;
