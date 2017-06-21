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
      source: this.props.source,
    }
  }

  render() {
    return(
      <Section>
        <Row>
          <Column>
            <h3>Command</h3>
            <Code>{ this.props.environment.command }</Code>

            <h3>Source Path</h3>
            <Code>{ this.props.environment.source_path }</Code>

            <h3>Dockerfile</h3>
            <pre>{ this.props.environment.dockerfile }</pre>
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

  sourceUpdated(newSource) {
    this.setState({ source: newSource })
    updateBlock({ source: newSource }, this.props.id)
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
