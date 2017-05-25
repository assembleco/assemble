import React from "react"
import PropTypes from "prop-types"
import $ from "jquery"
import styled from "styled-components"

import JSONTree from "react-json-tree";
import colors from "../../styles/colors"

class RunStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.checkBlockStatus = this.checkBlockStatus.bind(this);
  }

  componentDidMount() {
    this.checkBlockStatus();
  }

  render() {
    if(this.state.status)
      return (
        <Container style={backgroundColors[this.state.status]} >
          <Message>
            Run completed – {this.state.status}
          </Message>

          <div>
            STDOUT:
            <pre>
            {this.state.stdout}
            </pre>
          </div>

          <div>
            STDERR:
            <pre>
            {this.state.stderr}
            </pre>
          </div>
        </Container>
      );
    else
      return(
        <Container style={backgroundColors[this.state.status]} >
          <Message>
            Run is pending...
          </Message>
        </Container>
      );
  }

  checkBlockStatus() {
    $.get(this.props.url + '.json', (response) => {
      if(response.status === "pending") {
        setTimeout(this.checkBlockStatus, 500);
      } else {
        this.setState(response);
      }
    })
  }
}

const backgroundColors = {
  pending: { backgroundColor: colors.yellow },
  success: { backgroundColor: colors.green },
  failure: { backgroundColor: colors.red }
}

RunStatus.propTypes = {
  url: PropTypes.string.isRequired,
}

const Container = styled.div`
  padding: 0.75rem;
  margin-bottom: 1.5rem;
`

const Message = styled.div`
  margin-bottom: 1.5rem;
`

export default RunStatus;
