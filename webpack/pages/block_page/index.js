import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import $ from "jquery"

import BlockSource from "./block_source";
import BlockUsage from "./block_usage";
import SelectAnEvent from "./select_an_event"
import Title from "./title"
import OnOffSwitch from "./on_of_switch"
import Loading from "components/loading"

import Row from "layout/row"
import Column from "layout/column"

class BlockPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = { loaded: false };
  }

  render() {
    if(this.state.loaded) {
      return(
        <div>
          <Row>
            <Column>
              <Title
                created_at={this.state.created_at}
                description={this.state.description}
                editable={this.state.editable}
                name={this.state.name}
                user={this.state.user}
              />
            </Column>

            <Column>
              <OnOffSwitch
                active={this.state.active}
                editable={this.state.editable}
                name={this.state.name}
                user={this.state.user}
              />
            </Column>
          </Row>

          <SelectAnEvent
            editable={this.state.editable}
            name={this.state.name}
            user={this.state.user}
            eventSettings={this.state.event_settings}
          />

          <BlockSource
            command={this.state.command}
            editable={this.state.editable}
            dockerfile={this.state.dockerfile}
            icon={this.state.icon}
            name={this.state.name}
            source={this.state.source}
            source_path={this.state.source_path}
            user={this.state.user}
          />

          <BlockUsage
            editable={this.state.editable}
            initial_input_data={this.state.initial_input_data}
            name={this.state.name}
            run_block_url={this.state.run_block_url}
            schema={this.state.schema}
            user={this.state.user}
            user_api_key={this.state.user_api_key}
          />
        </div>
      );
    } else {
      return <Loading />
    }
  }

  componentDidMount() {
    const path = window.location.pathname + ".json"

    $.get({
      url: path,
      success: (data) => {
        this.setState(Object.assign({ loaded: true }, data))
      },
    })
  }
}

export default BlockPage;
