import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import ApolloClient, { createNetworkInterface } from "apollo-client"
import { ApolloProvider, graphql } from "react-apollo"
import gql from "graphql-tag"

import BlockSource from "./block_source";
import BlockUsage from "./block_usage";
import Subscription from "./subscription"
import Title from "./title"
import Loading from "components/loading"

import Row from "layout/row"
import Column from "layout/column"

const BlockPage = ({ data }) => (
  data.loading ? <Loading /> : (
    <div>
      <Title
        id={data.block.id}
        created_at={data.block.created_at}
        description={data.block.description}
        editable={data.block.editable}
        name={data.block.name}
        user={data.block.author}
      />

      <Subscription
        {...data.block.subscription}
        block_id={data.block.id}
      />

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

      <BlockUsage
        editable={data.block.editable}
        initial_input_data={data.block.initial_input_data}
        name={data.block.name}
        run_block_url={`${window.location.href}/runs.json`}
        schema={data.block.schema}
        user={data.block.author}
        user_api_key={data.session.api_key}
      />
    </div>
  )
)

const id = window.location.pathname.split("/")[2]

const BlockPageQuery = gql`
  query BlockQuery {
    block(id: ${id}) {
      command
      created_at
      description
      dockerfile
      editable
      id
      initial_input_data
      name
      schema
      source
      source_path

      author {
        handle
      }

      subscription {
        id
        trigger_options

        trigger {
          id
          name
          description
          options_schema
          data_schema

          service {
            name
            domain
          }
        }
      }
    }

    session {
      api_key
    }
  }
`

const BlockPageWithData = graphql(BlockPageQuery)(BlockPage)

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
