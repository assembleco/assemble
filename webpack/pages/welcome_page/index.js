import React from "react"
import styled from "styled-components"
import $ from "jquery"

import WelcomeMessage from "./welcome_message"
import BlockListing from "components/block_listing"
import Loading from "components/loading"

class WelcomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {loaded: false}
  }

  render() {
    return (
      <div>
        <WelcomeMessage/>

        { this.state.loaded
          ? <Wrapper>
              <List>
                {this.state.blocks.map(
                  (block) => <BlockListing {...block} key={block.id}/>
                )}
              </List>
            </Wrapper>
          : <Loading />
        }
      </div>
    );
  }

  componentDidMount() {
    const path = "/blocks.json"

    $.get({
      url: path,
      success: (data) => {
        this.setState(Object.assign({ loaded: true }, data))
      },
    })
  }
}

const Wrapper = styled.div`
  clear: both;
`

const List = styled.div`
  align-items: stretch;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 1.5rem;
  overflow: hidden;
`

export default WelcomePage
