import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Column from "layout/column"
import EditableField from "components/editable_field"
import Hint from "components/hint"
import Row from "layout/row"
import Section from "components/section"
import updateBlock from "util/update_block"

class BlockSource extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      command: this.props.command,
      source_path: this.props.source_path,
      source: this.props.source,
      dockerfile: this.props.dockerfile,
    }
  }

  render() {
    return(
      <Section>
        <Row>
          <Column>
            <h3>Command</h3>
            <EditableField.String
              editable={this.props.editable}
              hint="How do we run your code?"
              onChange={this.commandUpdated.bind(this)}
              initialValue={this.state.command}>
              <Code>{ this.state.command }</Code>
            </EditableField.String>

            <h3>Source Path</h3>
            <EditableField.String
              editable={this.props.editable}
              hint="Where should we save your script in your virtual machine?"
              initialValue={this.state.source_path}
              onChange={this.sourcePathUpdated.bind(this)}>
                <Code>{ this.state.source_path }</Code>
            </EditableField.String>

            <h3>Dockerfile</h3>
            <EditableField.Text
              hint={<div>
                <p>
                Define your code's environment as a Dockerfile –
                check out the <a href='https://www.digitalocean.com/community/tutorials/docker-explained-using-dockerfiles-to-automate-building-of-images'>official reference</a> or
                get in touch with the chat button in the corner
                if you're not familiar with Dockerfiles.
                </p>
                <p>
                Soon, you won't need to worry about this.
                We're working on automatically detecting
                your code's environment and dependencies
                so that all you need to write is the code.
                </p>
              </div>}
              editable={this.props.editable}
              onChange={this.dockerfileUpdated.bind(this)}
              initialValue={this.state.dockerfile}
              >
              <pre>{ this.state.dockerfile }</pre>
            </EditableField.Text>
          </Column>

          <Column>
            <h3>Source</h3>

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
      </Section>
    );
  }

  commandUpdated(newCommand) {
    this.setState({ command: newCommand })
    updateBlock({ command: newCommand }, this.props.id)
  }

  sourcePathUpdated(newSourcePath) {
    this.setState({ source_path: newSourcePath })
    updateBlock({ source_path: newSourcePath }, this.props.id)
  }

  sourceUpdated(newSource) {
    this.setState({ source: newSource })
    updateBlock({ source: newSource }, this.props.id)
  }

  dockerfileUpdated(newDockerfile) {
    this.setState({ dockerfile: newDockerfile })
    updateBlock({ dockerfile: newDockerfile }, this.props.id)
  }
}

const Icon = styled.img`
  height: 3rem;
`

const Code = styled.code`
  background-color: lightgray;
  color: red;
`

BlockSource.propTypes = {
  id: PropTypes.string.isRequired,
  command: PropTypes.string.isRequired,
  source_path: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  dockerfile: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
}

export default BlockSource;
