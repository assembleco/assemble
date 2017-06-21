import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Column from "layout/column"
import EditableField from "components/editable_field"
import Hint from "components/hint"
import Row from "layout/row"
import Section from "components/section"
import BlockUsage from "pages/block_page/block_usage";
import updateBlock from "util/update_block"

import Form from "react-jsonschema-form"

class BlockSource extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      source: this.props.source,
      schema: this.props.schema,
      inputData: this.props.initial_input_data,
    }
  }

  render() {
    const uiSchema =  {
      ssh_private_key: {
        "ui:widget": "textarea"
      }
    };

    return(
      <Section>
        <Row>
          <LeftColumn>
            <h3>Block Input</h3>

            <Hint>
            These variables will be passed into your block as JSON data.
            </Hint>

            <EditableField.Schema
              editable={this.props.editable}
              initialValue={this.state.schema}
              onChange={this.schemaUpdated.bind(this)}
              >

              <Form
                uiSchema={uiSchema}
                schema={this.state.schema}
                onChange={ (e) => this.setState({ inputData: e.formData }) }
                onSubmit={this.onSubmit.bind(this)}
                formData={this.state.inputData}
                >
                <FormFooter>
                  <a onClick={() => this.setState({ inputData: {} }) }>
                    Clear input fields
                  </a>

                  <Button
                    type="submit"
                    disabled={this.props.user_api_key == null}
                  >
                    Run the block with these inputs
                  </Button>
                </FormFooter>
              </Form>
            </EditableField.Schema>
          </LeftColumn>

          <Column>
            <h3>Block Source</h3>

            <EditableField.Text
              hint={<div>
                <p>
                What code should this block run?
                </p>
                <p>
                You can use any language you like -
                just be sure that it works
                with the Dockerfile and command that you enter below.
                </p>
                <p>
                We are working to support additional function sources soon,
                including GitHub repos, Gists, and images on Docker Hub.
                </p>
              </div>}
              editable={this.props.editable}
              onChange={this.sourceUpdated.bind(this)}
              initialValue={this.state.source}
              >
              <pre>{ this.state.source }</pre>
            </EditableField.Text>
          </Column>
        </Row>

        <BottomRow>
          { this.props.session
          ? <BlockUsage
              input_data={this.state.inputData}
              run_block_url={`${window.location.href}/runs.json`}
              user_api_key={this.props.user_api_key}
            />
          : "Sign in with GitHub to try out this block."
          }
        </BottomRow>
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

  schemaUpdated(newSchema) {
    this.setState({schema: newSchema})

    updateBlock(
      { schema_json: JSON.stringify(newSchema) },
      this.props.id,
    )
  }

  sourceUpdated(newSource) {
    this.setState({ source: newSource })
    updateBlock({ source: newSource }, this.props.id)
  }
}

const Icon = styled.img`
  height: 3rem;
`

const Code = styled.code`
  background-color: lightgrey;
  color: red;
`

const LeftColumn = styled(Column)`
  border-right: 1px solid lightgrey;
  padding-right: 0.75rem;
`

const BottomRow = styled(Row)`
  border-top: 1px solid lightgrey;
  padding-top: 0.75rem;
  margin-top: 0.75rem;
`

const FormFooter = styled.div`
  position: relative;
  overflow: hidden;
`

const Button = styled.button`
  float: right;
`

BlockSource.propTypes = {
  id: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
  environment: PropTypes.shape({
    command: PropTypes.string.isRequired,
    source_path: PropTypes.string.isRequired,
    dockerfile: PropTypes.string.isRequired,
  }).isRequired,
}

export default BlockSource;
