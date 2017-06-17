import React from "react"
import styled from "styled-components"
import ApolloClient, { createNetworkInterface } from "apollo-client"
import { ApolloProvider, graphql } from "react-apollo"

import WelcomePageQuery from "graphql/welcome_page.gql"

import WelcomeMessage from "./welcome_message"
import BlockListing from "components/block_listing"
import Loading from "components/loading"

const WelcomePage = (props) => (
  props.data.loading
  ? <Loading />
  : <div>
      <WelcomeMessage session={props.session}/>

      <Wrapper>
        <List>
          {props.data.blocks.map(
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

const WelcomePageWithData = graphql(WelcomePageQuery)(WelcomePage)

const WrappedWelcomePage = (props) => {
  const client = new ApolloClient({
    networkInterface: createNetworkInterface({
      uri: "/api",
      opts: {
        credentials: 'same-origin',
      },
    }),
  })

  return (
    <ApolloProvider client={client}>
      <WelcomePageWithData />
    </ApolloProvider>
  );
};

export default WrappedWelcomePage;
