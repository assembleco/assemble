import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import ApolloClient, { createNetworkInterface } from "apollo-client"
import { ApolloProvider, graphql } from "react-apollo"

import data_query from "graphql/block_runs.gql"

import Loading from "components/loading"
import Section from "components/section"
import Column from "layout/column"
import Row from "layout/row"
import RunStatus from "components/run_status"
import colors from "styles/colors"

class BlockRuns extends React.Component {
  constructor(props) {
    super(props)

    this.state = { selectedRunID: props.data.block && props.data.block.runs[0].id }
  }

  render() {
    if(this.props.data.loading)
      return <Loading />

    let selected_run = this.props.data.block.runs.filter((run) => (
      run.id == this.state.selectedRunID
    ))[0];

    return (
      <Section>
        <Row>
          <RunList>
            { this.props.data.block.runs.map((run) => (
              <Run
                key={run.id}
                onClick={() => this.setState({ selectedRunID: run.id }) }
                style={backgroundColors[run.status]}
                >
                Run on { run.created_at }
              </Run>
            )) }
          </RunList>

          <Column>
            <Row>
              { this.state.selectedRunID == null
                ? "Select a run to see the details"
                : <RunStatus
                  {...selected_run}
                  output={selected_run.stdout}
                  errors={selected_run.stderr}
                  />
              }
            </Row>
          </Column>
        </Row>
      </Section>
    )
  }
}

const BlockPageWithData = graphql(data_query, { options: ({ block_id }) => ({
  variables: { block_id: 21 }
})})(BlockRuns)

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

const RunList = styled(Column)`
  border-right: 1px solid lightgrey;
`

const Run = styled(Row)`
  padding: 0.75rem;
  border-bottom: 1px solid lightgrey;
`

const backgroundColors = {
  pending: { backgroundColor: colors.yellow },
  success: { backgroundColor: colors.green },
  failure: { backgroundColor: colors.red }
}

export default WrappedBlockPage;
