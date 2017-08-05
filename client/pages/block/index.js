import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { connect } from "react-redux"
import { graphql } from "react-apollo"

import blockRequest from "requests/block"

import BlockSource from "./block_source";
import BlockRuns from "./block_runs";
import Subscription from "./subscription"
import ServiceDependencies from "./service_dependencies"
import Title from "./title"
import Loading from "components/loading"
import Section from "components/section"

import Row from "layout/row"
import Column from "layout/column"

class BlockPage extends React.Component {
  componentDidMount() {
    this.props.requestBlock({ block_id: this.props.match.params.id })
  }

  render() {
    const block = this.props.block
    const data = this.props.data

    if(data.loading)
      return <Loading />

    return(
      <Wrapper>
        <MainColumn>
          <TitleWrapper>
            <Title
              id={block.id}
              created_at={block.created_at}
              description={block.description}
              editable={block.editable}
              name={block.name}
              user={block.author}
            />

            <ServiceDependencies
              block_id={block.id}
              editable={block.editable}
              service_dependencies={block.service_dependencies}
              services={data.credentialed_services}
            />
          </TitleWrapper>

          <BlockSource
            editable={block.editable}
            environment={block.environment}
            id={block.id}
            name={block.name}
            session={data.session}
            source={block.source}
          />

          <Subscription
            {...block.subscription}
            block_id={block.id}
          />
        </MainColumn>

        <RightSidebar>
          <BlockRuns block_id={block.id} />
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

const BlockPageWithDataAndState = connect(
  (state, { match }) => ({
    block: state.block.blocks[match.params.id],
    data: { loading: state.block.blocks[match.params.id] ? false : true },
  }),
  (dispatch) => ({ requestBlock: (vars) => dispatch(blockRequest(vars)) }),
)(BlockPage)

export default BlockPageWithDataAndState;
