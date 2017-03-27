import React from "react"
import Radium from "radium"
import $ from "jquery"

import JSONTree from "react-json-tree";
import colors from "../styles/colors"

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
        <div
          style={[RunStatus.styles.status, RunStatus.styles[this.state.status]]}
          >
          Run completed – {this.state.status}

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

          <div>
            Output:
            <JSONTree data={this.state.output} shouldExpandNode={() => false} />
          </div>
        </div>
      );
    else
      return(
        <div
          style={[RunStatus.styles.status, RunStatus.styles[this.state.status]]}
          >
          Run is pending...
        </div>
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

RunStatus.styles = {
  status: {
    padding: "0.75rem",
    marginBottom: "1.5rem",
  },
  pending: {
    backgroundColor: colors.yellow
  },
  success: {
    backgroundColor: colors.green
  }
}

RunStatus.propTypes = {
  url: React.PropTypes.string.isRequired,
}

export default Radium(RunStatus);
