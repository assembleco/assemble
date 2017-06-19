import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import ApolloClient, { createNetworkInterface } from "apollo-client"
import { ApolloProvider, graphql } from "react-apollo"

import data_query from "graphql/block_runs.gql"

import Column from "layout/column"
import Loading from "components/loading"
import Row from "layout/row"
import RunStatus from "components/run_status"
import Section from "components/section"
import Hint from "components/hint"
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
      <Wrapper>
        { this.state.selectedRunID
        ? <BlockRunWrapper selected={this.state.selectedRunID}>
            <Link onClick={() => this.setState({ selectedRunID: null })}>
              &lt; All Runs
            </Link>

            <RunStatus
            {...selected_run}
            output={selected_run.stdout}
            errors={selected_run.stderr}
            />
          </BlockRunWrapper>
        : <RunList>
            <RunListTitle>
              <h1>{this.props.data.block.runs.length} Runs</h1>
              <Hint>Refresh to update</Hint>
            </RunListTitle>

            { this.props.data.block.runs.map((run) => (
              <Run
                key={run.id}
                onClick={() => this.setState({ selectedRunID: run.id }) }
                style={backgroundColors[run.status]}
                >
                Run on { run.created_at }
                <RightText>&gt;</RightText>
              </Run>
            )) }
          </RunList>
        }
      </Wrapper>
    )
  }
}

const BlockRunsWithData = graphql(data_query, { options: ({ block_id }) => ({
  variables: { block_id }
})})(BlockRuns)

const Wrapper = styled(Section)`
  height: 100%;
  padding: 0;
  position: relative;
  right: 0;
`

const RunList = styled.div`
  border-right: 1px solid lightgrey;
  position: absolute;
  width: 100%;
`

const BlockRunWrapper = styled.div`
  overflow: scroll;
`

const RunListTitle = styled.div`
  padding: 0.75rem;
`

const Run = styled(Row)`
  padding: 0.75rem;
  border-bottom: 1px solid lightgrey;
`

const Link = styled.div`
  text-decoration: underline;
  padding: 0.75rem;
`

const RightText = styled.span`
  position: absolute;
  right: 1.5rem;
`

const backgroundColors = {
  pending: { backgroundColor: colors.yellow },
  success: { backgroundColor: colors.green },
  failure: { backgroundColor: colors.red }
}

export default BlockRunsWithData;
