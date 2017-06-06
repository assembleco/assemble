import React from "react"
import styled from "styled-components"

import WelcomeMessage from "./welcome_message"
import BlockListing from "components/block_listing"

const WelcomePage = (props) => (
  <div>
    <WelcomeMessage/>

    <div className="layout-clear">
      <div className="list">
        <div className="list-items">
          {props.blocks.map(
            (block) => <BlockListing {...block} key={block.id}/>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default WelcomePage
