import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import BlockSource from "./block_source";
import BlockUsage from "./block_usage";
import SelectAnEvent from "./select_an_event"
import Title from "./title"
import OnOffSwitch from "./on_of_switch"

import Row from "layout/row"
import Column from "layout/column"

class BlockPage extends React.Component {
  render() {
    const editable = (this.props.current_user.id == this.props.user.id)

    return(
      <div>
        <Row>
          <Column>
            <Title
              created_at={this.props.created_at}
              description={this.props.description}
              editable={editable}
              name={this.props.name}
              user={this.props.user}
            />
          </Column>

          <Column>
            <OnOffSwitch
              active={this.props.active}
              editable={editable}
              name={this.props.name}
              user={this.props.user}
            />
          </Column>
        </Row>

        <SelectAnEvent
          editable={editable}
          name={this.props.name}
          user={this.props.user}
          eventSettings={this.props.event_settings}
        />

        <BlockSource
          command={this.props.command}
          editable={editable}
          dockerfile={this.props.dockerfile}
          icon={this.props.icon}
          name={this.props.name}
          source={this.props.source}
          source_path={this.props.source_path}
          user={this.props.user}
        />

        <BlockUsage
          editable={editable}
          initial_input_data={this.props.initial_input_data}
          name={this.props.name}
          run_block_url={this.props.run_block_url}
          schema={this.props.schema}
          user={this.props.user}
          user_api_key={this.props.user_api_key}
        />
      </div>
    );
  }
}

export default BlockPage;
