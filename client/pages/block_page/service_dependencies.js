import React from "react"
import styled from "styled-components"
import { graphql, compose } from "react-apollo"

import create_service_dependency from "graphql/create_service_dependency.gql"
import destroy_service_dependency from "graphql/destroy_service_dependency.gql"
import dependencies_query from "graphql/dependencies.gql"

import Action from "components/action"
import AuthenticationLink from "components/authentication_link"
import Hint from "components/hint"
import Loading from "components/loading"
import Section from "components/section"
import Row from "layout/row"

class ServiceDependencies extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      new_dependency: null,
    }
  }

  render() {
    return (
      this.props.data.loading
      ? <Loading/>
      : <Wrapper>
          <h2>Depends on:</h2>

          {this.props.data.block.service_dependencies.map((dependency) => (
            <Section key={dependency.id}>
              <Row>
                <ServiceName>{dependency.service.name}</ServiceName>

                { this.props.editable &&
                  <Action onClick={() => this.removeDependency(dependency.id)}>
                    (x)
                  </Action>
                }
              </Row>

              <Hint>
                Provides:

                <ul>
                  { Object.keys(dependency.credential_mapping).map((env) => (
                    <li key={env}>{env}</li>
                  )) }
                </ul>
              </Hint>

              { dependency.authenticated
                ? <div> ✅ Signed in to {dependency.service.name}.</div>
                : <AuthenticationLink {...dependency.service} />
              }
            </Section>
          ))}

          {this.props.data.block.service_dependencies.length == 0 &&
            <Hint>
              This block has no dependencies.
            </Hint>
          }

          { this.props.editable &&
            (this.state.new_dependency
            ? this.renderNewDependencyBlock()
            : <Action onClick={() => this.setState({
                 new_dependency: { service_id: "null" },
               }) } >
                + Add another dependency
              </Action>
          )}
        </Wrapper>
    )
  }

  renderNewDependencyBlock() {
    return (
      <Section>
        <select
          value={this.state.new_dependency ? this.state.new_dependency.service_id : "null"}
          onChange={this.newDependencySelected.bind(this)}
          >
          <option key="null" value={null}>Choose a service</option>

          { this.props.services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} | {service.domain}
              </option>
          )) }
        </select>
      </Section>
    )
  }

  newDependencySelected(event) {
    const service_id = parseInt(event.target.value)

    this.props.create_service_dependency({
      variables: {
        block_id: this.props.block_id,
        service_id: service_id,
      },
      refetchQueries: [{
        query: dependencies_query,
        variables: { block_id: this.props.block_id },
      }],
    }).then(() => this.setState({ new_dependency: null }))
  }

  removeDependency(id) {
    this.props.destroy_service_dependency({
      variables: { id: id },
      refetchQueries: [{
        query: dependencies_query,
        variables: { block_id: this.props.block_id },
      }],
    })
  }
}

const ServiceName = styled.span`
  margin-bottom: 0.75rem;
  width: 100%;
`

const Wrapper = styled.div`
  width: 50%;
`

export default compose(
  graphql(dependencies_query),
  graphql(create_service_dependency, { name: "create_service_dependency" }),
  graphql(destroy_service_dependency, { name: "destroy_service_dependency" }),
)(ServiceDependencies)
