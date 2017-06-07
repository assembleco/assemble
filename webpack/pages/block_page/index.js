import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import ApolloClient, { createNetworkInterface } from "apollo-client"
import { ApolloProvider, graphql } from "react-apollo"
import gql from "graphql-tag"

import BlockSource from "./block_source";
import BlockUsage from "./block_usage";
import SelectAnEvent from "./select_an_event"
import Title from "./title"
import OnOffSwitch from "./on_of_switch"
import Loading from "components/loading"

import Row from "layout/row"
import Column from "layout/column"

const BlockPage = (props) => (
  props.data.loading ? <Loading /> : (
    <div>
      <Row>
        <Column>
          <Title
            id={props.data.block.id}
            created_at={props.data.block.created_at}
            description={props.data.block.description}
            editable={props.data.block.editable}
            name={props.data.block.name}
            user={props.data.block.author}
          />
        </Column>

        <Column>
          <OnOffSwitch
            id={props.data.block.id}
            active={props.data.block.active}
            editable={props.data.block.editable}
            name={props.data.block.name}
            user={props.data.block.author}
          />
        </Column>
      </Row>

      <SelectAnEvent
        id={props.data.block.id}
        editable={props.data.block.editable}
        name={props.data.block.name}
        user={props.data.block.author}
        eventSettings={props.data.block.event_settings}
      />

      <BlockSource
        id={props.data.block.id}
        command={props.data.block.command}
        editable={props.data.block.editable}
        dockerfile={props.data.block.dockerfile}
        name={props.data.block.name}
        source={props.data.block.source}
        source_path={props.data.block.source_path}
        user={props.data.block.author}
      />

      <BlockUsage
        editable={props.data.block.editable}
        initial_input_data={props.data.block.initial_input_data}
        name={props.data.block.name}
        run_block_url={`${window.location.href}/runs.json`}
        schema={props.data.block.schema}
        user={props.data.block.author}
        user_api_key={props.data.session.api_key}
      />
    </div>
  )
)

const id = window.location.pathname.split("/")[2]

const BlockPageQuery = gql`
  query BlockQuery {
    block(id: ${id}) {
      active
      command
      created_at
      description
      dockerfile
      editable
      event_settings
      id
      initial_input_data
      name
      schema
      source
      source_path

      author {
        handle
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
