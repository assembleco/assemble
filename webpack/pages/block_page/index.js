import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import BlockInformation from "./block_information";
import BlockUsage from "./block_usage";
import SelectAnEvent from "./select_an_event"

class BlockPage extends React.Component {
  render() {
    return(
      <div>
        <SelectAnEvent
          />

        <BlockInformation
          icon={this.props.icon}
          user={this.props.user}
          created_at={this.props.created_at}
          description={this.props.description}
          name={this.props.name}
          source={this.props.source}
          dockerfile={this.props.dockerfile}
          source_path={this.props.source_path}
          command={this.props.command}
          current_user={this.props.current_user}
          />

        <BlockUsage
          current_user={this.props.current_user}
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
