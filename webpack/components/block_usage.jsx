import React from "react"
import $ from "jquery"

import Form from "react-jsonschema-form"

class BlockUsage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputData: this.props.initial_input_data || {}
    }
  }

  render() {
    return (
      <div className="section">
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
            <button type="submit" style={{ float: "right" }}>Go</button>
          </div>
        </Form>

        <p className="hint" style={{ marginTop: "0.75rem" }}>
          Run this block from your command line with the above inputs,
          or switch out the inputs as needed.
        </p>

        <pre>
{`curl \\\n\
  '${ this.props.run_block_url }' \\\n\
  -X POST \\\n\
  -H "Content-Type: application/json" \\\n\
  -H "Accept: application/json" \\\n\
  -d '${JSON.stringify({ data: this.state.inputData }, null, 2)}'`}
        </pre>
      </div>
    );
  }

  onSubmit(event) {
    const data = { data: event.formData };
    $.post(this.props.run_block_url, data, () => { location.reload(); });
  }
}

BlockUsage.propTypes = {
  run_block_url: React.PropTypes.string.isRequired,
  schema: React.PropTypes.object.isRequired,
  initial_input_data: React.PropTypes.object,
}

export default BlockUsage;
