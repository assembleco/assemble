import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { connect } from "react-redux"
import { graphql } from "react-apollo"
import block_page_query from "graphql/block_page.gql"

import BlockSource from "./block_source";
import BlockRuns from "./block_runs";
import Subscription from "./subscription"
import ServiceDependencies from "./service_dependencies"
import Title from "./title"
import Loading from "components/loading"
import Section from "components/section"

import Row from "layout/row"
import Column from "layout/column"
import actions from "actions"

class BlockPage extends React.Component {
  componentDidMount() {
    this.props.getGraph(
      "block.input_data",
      { id: this.props.match.params.id },
    )
  }

  render() {
    const data = this.props.data

    if(data.loading)
      return <Loading />

    if(this.props.fetching)
      return <Loading />

    return(
      <Wrapper>
        <MainColumn>
          <TitleWrapper>
            <Title
              id={data.block.id}
              created_at={data.block.created_at}
              description={data.block.description}
              editable={data.block.editable}
              name={data.block.name}
              user={data.block.author}
            />

            <ServiceDependencies
              block_id={data.block.id}
              editable={data.block.editable}
              service_dependencies={data.block.service_dependencies}
              services={data.credentialed_services}
            />
          </TitleWrapper>

          <ConnectedBlockSource
            editable={data.block.editable}
            environment={data.block.environment}
            environments={data.environments}
            id={data.block.id}
            name={data.block.name}
            session={data.session}
            source={data.block.source}
          />

          <Subscription
            {...data.block.subscription}
            block_id={data.block.id}
          />
        </MainColumn>

        <RightSidebar>
          <BlockRuns block_id={data.block.id} />
        </RightSidebar>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  align-items: stretch;
  display: flex;
  justify-content: space-between;
  position: relative;
`

const TitleWrapper = styled(Row)`
  margin-bottom: 1.5rem;
`

const MainColumn = styled.div`
  margin-right: 1.5rem;
  overflow-x: scroll;
  padding: 1.5rem;
`

const RightSidebar = styled.div`
  flex: 0 0 20rem;
`

const BlockPageWithData = graphql(block_page_query, {
  options: ({ match }) => ({ variables: { block_id: match.params.id } })
})(BlockPage)

const BlockPageWithDataAndState = connect(
  (state) => ({ fetching: state.app.fetching }),
  (dispatch) => ({ getGraph: (key, vars) => dispatch(actions.getGraph(key, vars)) }),
)(BlockPageWithData)

export default BlockPageWithDataAndState;



const mapStateToProps = (state, ownProps) => {
  const block_id = ownProps.id
  const input_json = state.app.get("blocks").get(block_id).get("input_json")

  return { input_json }
}

const mapDispatchToProps = (dispatch) => (
  {
    onInputChange: (input_json, ownProps) => dispatch({
      type: "CHANGE_INPUT_JSON",
      id: ownProps.id,
      input_json: input_json,
    })
  }
)

const ConnectedBlockSource = connect(mapStateToProps, mapDispatchToProps)(BlockSource)

