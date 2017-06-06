import React from "react"
import styled from "styled-components"

import WelcomeMessage from "./welcome_message"
import BlockListing from "components/block_listing"

const WelcomePage = (props) => (
  <div>
    <WelcomeMessage/>

    <Wrapper>
      <List>
        {props.blocks.map(
          (block) => <BlockListing {...block} key={block.id}/>
        )}
      </List>
    </Wrapper>
  </div>
);

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
