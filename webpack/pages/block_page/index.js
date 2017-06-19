import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import ApolloClient, { createNetworkInterface } from "apollo-client"
import { ApolloProvider, graphql } from "react-apollo"
import BlockPageQuery from "graphql/block_page.gql"

import BlockSource from "./block_source";
import BlockUsage from "./block_usage";
import BlockRuns from "./block_runs";
import Subscription from "./subscription"
import Title from "./title"
import Loading from "components/loading"
import Section from "components/section"

import Row from "layout/row"
import Column from "layout/column"

const BlockPage = ({ data }) => (
  data.loading ? <Loading /> : (
    <Wrapper>
      <MainColumn>
        <Title
          id={data.block.id}
          created_at={data.block.created_at}
          description={data.block.description}
          editable={data.block.editable}
          name={data.block.name}
          user={data.block.author}
        />

        { data.session
        ? <BlockUsage
            editable={data.block.editable}
            initial_input_data={data.block.initial_input_data}
            name={data.block.name}
            run_block_url={`${window.location.href}/runs.json`}
            schema={data.block.schema}
            user={data.block.author}
            user_api_key={data.session.api_key}
          />
        : <Section>
            Sign in with GitHub to try out this block.
          </Section>
        }

        <BlockSource
          id={data.block.id}
          command={data.block.command}
          editable={data.block.editable}
          dockerfile={data.block.dockerfile}
          name={data.block.name}
          source={data.block.source}
          source_path={data.block.source_path}
          user={data.block.author}
        />

        <Subscription
          {...data.block.subscription}
          block_id={data.block.id}
          schema={data.block.schema}
        />
      </MainColumn>

      <RightSidebar>
        <BlockRuns block_id={data.block.id} />
      </RightSidebar>
    </Wrapper>
  )
)

const Wrapper = styled.div`
  align-items: stretch;
  display: flex;
  justify-content: space-between;
  position: relative;
`

const MainColumn = styled.div`
  margin-right: 1.5rem;
  overflow-x: scroll;
  padding: 1.5rem;
`

const RightSidebar = styled.div`
  flex: 0 0 20rem;
`

const BlockPageWithData = graphql(BlockPageQuery, { options: {
  variables: { block_id: window.location.pathname.split("/")[2] }
}})(BlockPage)

const WrappedBlockPage = (props) => {
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
      <BlockPageWithData />
    </ApolloProvider>
  );
};

export default WrappedBlockPage;
