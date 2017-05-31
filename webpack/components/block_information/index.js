import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import dateFormat from "dateformat"

import Section from "components/section"

import Logo from "components/logo"
import Hint from "components/hint"
import Toggle from "components/toggle"

class BlockInformation extends React.Component {
  render() {
    const date = new Date(this.props.created_at);

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
              {this.props.name}
            </Title>

            <Hint>
              Created on {dateFormat(date, "mmmm d, yyyy")}
            </Hint>
          </VerticalFlex>

          <a href={`/blocks/${this.props.user.handle}/${this.props.name}/edit`}>
            Edit
          </a>
        </HorizontalFlex>

        <Description dangerouslySetInnerHTML={{__html: this.props.description}} />

        <Toggle showLabel="Show source" hideLabel="Hide source">
          <h3>Command: <Code>{ this.props.command }</Code></h3>

          <h3>Source: <Code>{ this.props.source_path }</Code></h3>
          <pre>{ this.props.source }</pre>

          <h3>Dockerfile</h3>
          <pre>{ this.props.dockerfile }</pre>
        </Toggle>
      </Section>
    );
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
