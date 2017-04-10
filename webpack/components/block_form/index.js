import React from "react"
import $ from "jquery"
import styled from "styled-components"
import { Page, Row, Column } from 'hedron';

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

          <Column xs={1}>
            <Section>
              <h2>Block Source</h2>

              <Hint>
                <p>
                You can add serverless functions from a number of different sources.
                </p>
                <p>
                If you'd like to see another source added,
                please <a href="https://github.com/assembleapp/registry/issues/new">open an issue on GitHub</a>.
                </p>
              </Hint>

              <div>
                <label>Source</label>

                <TabNavigation
                  activeTab={this.props.block.source_type}
                  tabLabels={{
                    github_gist: "Github Gist",
                    docker_image: "Public Docker Image",
                  }}
                  tabs={{
                  docker_image: <Form.Input
                    attr="docker_image"
                    model="block"
                    value={this.props.block.docker_image}
                    required
                    >
                    <p>
                      At the moment, you can only register
                      <a href='http://open.iron.io'> IronFunctions </a>
                      that are publicly available on Docker Hub.
                    </p>
                    <p>
                      We are working to support additional function sources soon.
                    </p>
                    <p>
                      Please use the full image ID, as in: <code>username/imagename:version</code>.
                    </p>
                  </Form.Input>,

                  github_gist: <Form.Input
                    attr="github_gist_url"
                    model="block"
                    value={this.props.block.github_gist_url}
                    required
                    />
                }} />
              </div>
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

export default BlockForm;
