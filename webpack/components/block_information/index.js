import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import dateFormat from "dateformat"

import Section from "components/section"

import Logo from "components/logo"
import Hint from "components/hint"
import Toggle from "components/toggle"

import Markdown from "components/markdown"

import EditableField from "components/editable_field"
import updateBlock from "util/update_block"

class BlockInformation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.name,
      command: this.props.command,
      source_path: this.props.source_path,
      source: this.props.source,
      dockerfile: this.props.dockerfile,
      description: this.props.description,
    }
  }

  render() {
    const date = new Date(this.props.created_at);
    const editable = (this.props.current_user.id == this.props.user.id)

    return(
      <Section>
        <HorizontalFlex>
          <Logo />

          <VerticalFlex>
            <Title>
              <a href={`/users/${this.props.user.handle}`}>
                {this.props.user.handle}
              </a>

              &nbsp;/&nbsp;
              <EditableField.String
                editable={editable}
                initialValue={this.state.name}
                onChange={this.nameUpdated.bind(this)}
                >
                {this.state.name}
              </EditableField.String>
            </Title>

            <Hint>
              Created on {dateFormat(date, "mmmm d, yyyy")}
            </Hint>
          </VerticalFlex>

          { editable
            ? <a href={`/blocks/${this.props.user.handle}/${this.props.name}/edit`}>
                Edit
              </a>
            : ''
          }
        </HorizontalFlex>

        <Description>
          <Markdown source={this.state.description}/>
        </Description>

        <Toggle showLabel="Show source" hideLabel="Hide source">
          <h3>
            Command:
            <EditableField.String
              editable={editable}
              hint="How do we run your code?"
              onChange={this.commandUpdated.bind(this)}
              initialValue={this.state.command}>
              <Code>{ this.state.command }</Code>
            </EditableField.String>
          </h3>

          <h3>
            Source:
            <EditableField.String
              editable={editable}
              hint="Where should we save your script in your virtual machine?"
              initialValue={this.state.source_path}
              onChange={this.sourcePathUpdated.bind(this)}>
                <Code>{ this.state.source_path }</Code>
            </EditableField.String>
          </h3>

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
            editable={editable}
            onChange={this.sourceUpdated.bind(this)}
            initialValue={this.state.source}
            >
            <pre>{ this.state.source }</pre>
          </EditableField.Text>

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
            editable={editable}
            onChange={this.dockerfileUpdated.bind(this)}
            initialValue={this.state.dockerfile}
            >
            <pre>{ this.state.dockerfile }</pre>
          </EditableField.Text>
        </Toggle>
      </Section>
    );
  }

  commandUpdated(newCommand) {
    this.setState({ command: newCommand })
    updateBlock({ command: newCommand }, this.props.user.handle, this.props.name)
  }

  sourcePathUpdated(newSourcePath) {
    this.setState({ source_path: newSourcePath })
    updateBlock({ source_path: newSourcePath }, this.props.user.handle, this.props.name)
  }

  nameUpdated(newName) {
    this.setState({ name: newName })
    updateBlock({ name: newName }, this.props.user.handle, this.props.name)
  }

  sourceUpdated(newSource) {
    this.setState({ source: newSource })
    updateBlock({ source: newSource }, this.props.user.handle, this.props.name)
  }

  dockerfileUpdated(newDockerfile) {
    this.setState({ dockerfile: newDockerfile })
    updateBlock({ dockerfile: newDockerfile }, this.props.user.handle, this.props.name)
  }
}

const Icon = styled.img`
  height: 3rem;
`

const HorizontalFlex = styled.div`
  display: flex;
`

const VerticalFlex = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
`

const Title = styled.h1``;

const Description = styled.div`
  margin-top: 1.5rem;
`

const Code = styled.code`
  background-color: lightgray;
  color: red;
`

export default BlockInformation;
