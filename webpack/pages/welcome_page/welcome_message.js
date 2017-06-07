import React from "react"
import styled from "styled-components"

import $ from "jquery"

import Section from "components/section"

class WelcomeMessage extends React.Component {
  render() {
    return (
      <Row>
        <Wrapper>
          <p>
          Assemble is a registry of open-source, publicly-usable&nbsp;
          <a href="https://www.notion.so/assemble/Glossary-107d90a48c6441f79ff35b6943cc3fad#44c9a85610884b45a1f8941e4f9d9f9c">
          Serverless functions
          </a>,
          which we call <em>Blocks</em>.
          </p>

          <p>
          We are working with the community to make it easier to use and share blocks,
          with the goal of making them as accessible as possible
          for novice developers and non-developers.&nbsp;
          <a href="/about">Learn more</a>.
          </p>

          <p>
          { this.props.session
            ? <button onClick={this.createNewBlock.bind(this)}>+ Create a new block</button>
            : <a href="/session/new">Sign in to get started</a>
          }
          </p>
        </Wrapper>
      </Row>
    );
  }

  createNewBlock() {
    $.ajax({
      method: "POST",
      url: "/blocks",
      data: { block: {
        name: "click_to_rename",
        description: "Click to edit the block's description",
        source: "# Click to edit the block's source",
        source_path: "/click/to/edit/the/source/path",
        command: 'echo "click to edit the block\'s command."',
        dockerfile: "FROM ubuntu\n# click to edit the dockerfile"
      }},
      success: (data) => { window.location = `/blocks/${this.props.current_user.handle}/${data.name}` },
    })
  }
}

const Row = styled.div`
  display: flex;
  justify-content: space-around;
`

const Wrapper = styled(Section)`
  width: 50%;
`

export default WelcomeMessage
