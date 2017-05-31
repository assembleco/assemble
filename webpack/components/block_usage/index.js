import React from "react"
import PropTypes from "prop-types"
import $ from "jquery"

import Form from "react-jsonschema-form"
import RunStatus from "components/run_status"
import CodeUsage from "./code_usage"

import Section from "components/section"
import Hint from "components/hint"

class BlockUsage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputData: this.props.initial_input_data || {},
      run: null,
    }
  }

  render() {
    const uiSchema =  {
      ssh_private_key: {
        "ui:widget": "textarea" // could also be "select"
      }
    };

    return (
      <Section>
        { this.renderRun() }

        <h2>Try it out</h2>

        <Hint>
          Run this block with custom inputs,
          in a web form or on your command line.
        </Hint>

        { this.props.user.id == this.props.current_user.id
          ? <Hint>
            As the block's author, <a
              href={this.props.run_block_url.replace("runs", "edit")}>
              edit the block's input schema
            </a> to help others understand how it works.
            </Hint>
          : ""
        }

        <Form
          uiSchema={uiSchema}
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
      </Section>
    );
  }

  onSubmit(event) {
    this.setState({ run: { status: "pending" } });

    $.post(
      this.props.run_block_url,
      { data: event.formData },
      this.runFinished.bind(this),
    )
  }

  runFinished(event) {
    this.setState({ run: event })
  }

  renderRun() {
    if(this.state.run)
      return <RunStatus {...this.state.run}/>
  }
}

BlockUsage.propTypes = {
  user_api_key: PropTypes.string.isRequired,
  run_block_url: PropTypes.string.isRequired,
  schema: PropTypes.object.isRequired,
  initial_input_data: PropTypes.object,
}

export default BlockUsage;
