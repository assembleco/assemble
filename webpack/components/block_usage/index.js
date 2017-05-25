import React from "react"
import PropTypes from "prop-types"
import $ from "jquery"

import Form from "react-jsonschema-form"
import RunStatus from "../run_status"
import CodeUsage from "./code_usage"

class BlockUsage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputData: this.props.initial_input_data || {},
      run: null,
    }
  }

  render() {
    return (
      <div className="section">
        { this.renderRun() }

        <h2>Try it out</h2>

        <p className="hint">
          Run this block with custom inputs,
          in a web form or on your command line.
        </p>

        <Form
          schema={this.props.schema}
          onChange={ (e) => this.setState({ inputData: e.formData }) }
          onSubmit={this.onSubmit.bind(this)}
          formData={this.state.inputData}
          >
          <div style={{ position: "relative", overflow: "hidden" }}>
            <a onClick={() => this.setState({ inputData: {} }) }>
              Clear input fields
            </a>

            <button
              type="submit"
              style={{ float: "right" }}
              disabled={this.props.user_api_key == null}
            >
            Go
            </button>
          </div>
        </Form>

        <CodeUsage
          user_api_key={this.props.user_api_key}
          input_data={this.state.inputData}
          run_block_url={this.props.run_block_url}
          />
      </div>
    );
  }

  onSubmit(event) {
    const data = { data: event.formData };

    this.setState({ run: null });

    $.post(
      this.props.run_block_url,
      data,
      (event) => this.setState({ run: event.path }),
    )
  }

  renderRun() {
    if(this.state.run)
      return <RunStatus url={this.state.run}/>
  }
}

BlockUsage.propTypes = {
  user_api_key: PropTypes.string.isRequired,
  run_block_url: PropTypes.string.isRequired,
  schema: PropTypes.object.isRequired,
  initial_input_data: PropTypes.object,
}

export default BlockUsage;
