import React from "react"
import $ from "jquery"
import styled from "styled-components"
import { Page, Row, Column } from 'hedron';

import BuildStep from "./build_step";
import Form from "components/form"
import Hint from "components/hint"
import Schema from "components/schema"
import Section from "components/section"
import TabNavigation from "components/tab_navigation"

class BlockForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { authenticity_token: '' }
  }

  componentDidMount() {
    let auth_token = $('meta[name="csrf-token"]').attr('content');

    this.setState({authenticity_token: auth_token});
  }

  render() {
    return (
      <Form submit={this.props.submit} >
        <CenteredColumn>
          <h1>{this.props.title}</h1>
        </CenteredColumn>

        <Row divisions={2}>
          <Column xs={1}>
            <Section>
              <h2>Step 1: Build</h2>
              <BuildStep block={this.props.block} />
            </Section>
          </Column>

          <Column xs={1}>
            <Section>
              <h2>Block Metadata</h2>

              <Form.Input
                attr="name"
                model="block"
                required
                value={this.props.block.name}
                />

              <Form.Input
                attr="description"
                model="block"
                required
                type="text"
                value={this.props.block.description}
                >
                <p>
                  If you want other people to use your block, you better explain how it works!
                </p>
                <p>
                  We support
                  <a href='https://help.github.com/articles/basic-writing-and-formatting-syntax/'> Github-Flavored Markdown</a>.
                </p>
              </Form.Input>

              <Form.Input
                attr="schema_json"
                id="schema_json"
                model="block"
                required
                type="hidden"
                value={JSON.stringify(this.props.block.schema)}
                >
                <p>
                  What information does this block need in order to run correctly?
                  Users will be responsible for providing this information
                  whenever they run your block.
                </p> <p>
                  A checkbox indicates that a field is required.
                </p>
              </Form.Input>

              <Schema
                initialValue={this.props.block.schema}
                formElement="#schema_json"
                editable
                />
            </Section>
          </Column>
        </Row>

        <CenteredColumn>
          <Form.Submit submit={this.props.submit} />
        </CenteredColumn>
      </Form>
    );
  }
}

BlockForm.propTypes = {
  block: React.PropTypes.object.isRequired,
  submit: React.PropTypes.object.isRequired,
  title: React.PropTypes.string.isRequired,
}

const CenteredColumn = styled(Column)`
  text-align: center;
`

const Hidden = styled.div`
  visibility: hidden;
`

export default BlockForm;
