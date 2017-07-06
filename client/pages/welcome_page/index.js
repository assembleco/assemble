import React from "react"
import styled from "styled-components"

import { graphql } from "react-apollo"
import WelcomePageQuery from "graphql/welcome_page.gql"

import { Page } from "hedron"

import WelcomeMessage from "./welcome_message"
import BlockListing from "components/block_listing"
import Loading from "components/loading"

const WelcomePage = (props) => (
  props.data.loading
  ? <Loading />
  : <Page width="1200px">
      <WelcomeMessage session={props.data.session}/>

      <Wrapper>
        <List>
          {props.data.blocks.map(
            (block) => <BlockListing {...block} key={block.id}/>
          )}
        </List>
      </Wrapper>
    </Page>
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

const WelcomePageWithData = graphql(WelcomePageQuery)(WelcomePage)

export default WelcomePageWithData;
