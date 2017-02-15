import React from "react"

import Form from "react-jsonschema-form"

class BlockUsage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputData: this.props.initialInputData || {}
    }
  }

  render() {
    return (
      <div className="section">
        <h2>Inputs</h2>

        { this.edit_hint() }

        <Form
        schema={this.props.schema}
        onChange={ (e) => this.setState({ inputData: e.formData }) }
        formData={this.state.inputData}
        />

        <h2>Try it out</h2>

        <p className="hint">
        In your command line, run:
        </p>

        <pre>
{`curl \\\n\
  ${ this.props.run_block_url } \\\n\
  -X POST \\\n\
  -H "Content-Type: application/json" \\\n\
  -d '${JSON.stringify({ data: this.state.inputData })}'`}
        </pre>
      </div>
    );
  }

  edit_hint() {
    if(this.props.user_owns_block)
      return (
        <p className="hint">
          <a href={this.props.edit_block_path}>
            Edit the block's input schema
          </a>
          &nbsp;
          to help users understand the inputs that it accepts.
        </p>
      );
  }
}

BlockUsage.propTypes = {
  user_owns_block: React.PropTypes.bool.isRequired,
  edit_block_path: React.PropTypes.string.isRequired,
  run_block_url: React.PropTypes.string.isRequired,
  schema: React.PropTypes.object.isRequired,
  initialInputData: React.PropTypes.object.isRequired,
}

export default BlockUsage;
