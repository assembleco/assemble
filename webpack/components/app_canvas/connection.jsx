import React from "react"
import PropTypes from "prop-types"

import PropDefinitions from "prop_definitions"

import Connector from "components/app_canvas/connector"
import NewConnection from "components/app_canvas/new_connection"
import Block from "components/app_canvas/block"

class Connection extends React.Component {
  render() {
    return (
      <div>
        <Connector />

        <Block
          {...this.props.app.blocks[this.props.slug]}
          app={this.props.app}
          />

        { this.connectedBlocks().map((connected_slug, index) =>
            <Connection
              key={index}
              all_blocks={this.props.all_blocks}
              slug={connected_slug}
              app_id={this.props.app_id}
              app={this.props.app}
              />
        ) }

        { this.connectedBlocks().length == 0 &&
          <NewConnection
            all_blocks={this.props.all_blocks}
            app_id={this.props.app_id}
            source_id={this.props.id}
            source_type="Block"
            /> }
      </div>
    );
  }

  connectedBlocks() {
    return this.props.app.connections[this.props.slug] || [];
  }
}

Connection.propTypes = {
  app_id: PropTypes.number.isRequired,
  all_blocks: PropTypes.array,
  app: PropTypes.shape(PropDefinitions.app).isRequired,
}

export default Connection;
