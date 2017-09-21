import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import ApolloClient, { createNetworkInterface } from "apollo-client"
import { ApolloProvider, graphql } from "react-apollo"

import data_query from "graphql/block_runs.gql"

import Column from "layout/column"
import Hint from "components/hint"
import Loading from "components/loading"
import Modal from "react-modal"
import Row from "layout/row"
import RunStatus from "components/run_status"
import Section from "components/section"
import colors from "styles/colors"

class BlockRuns extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedRunID: null,
    }
  }

  render() {
    if(this.props.data.loading)
      return <Loading />

    let selected_run = this.props.data.block.runs.filter((run) => (
      run.id == this.state.selectedRunID
    ))[0];

    let runs = this.props.data.block.runs.slice()

    return (
      <Wrapper>
        { this.state.selectedRunID &&
          <Modal
            isOpen
            contentLabel={`The results of run ${this.state.selectedRunID}`}
            onRequestClose={() => this.setState({ selectedRunID: null })}
          >
            <RunStatus
            {...selected_run}
            output={selected_run.stdout}
            errors={selected_run.stderr}
            />
          </Modal>
        }

        <RunList>
          <RunListTitle>
            <h1>{this.props.data.block.runs.length} Runs</h1>
            <Hint>Refresh to update</Hint>
          </RunListTitle>

          { runs.reverse().map((run) => (
            <Run
              key={run.id}
              onClick={() => this.setState({ selectedRunID: run.id }) }
              style={backgroundColors[run.status]}
              >
              #{run.id},
              Run on { run.created_at }
              <RightText>&gt;</RightText>
            </Run>
          )) }
        </RunList>
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

const RunListTitle = styled.div`
  padding: 0.75rem;
`

const Run = styled(Row)`
  padding: 0.75rem;
  border-bottom: 1px solid lightgrey;
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
