import React from "react"

import PropDefinitions from "prop_definitions"

import Connection from "components/app_canvas/connection"
import NewConnection from "components/app_canvas/new_connection"
import Schema from "components/app_canvas/schema"

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.renderConnection = this.renderConnection.bind(this);
  }

  render() {
    return (
      <div style={{ padding: "0.75rem", overflow: "hidden" }}>
        <div style={ Feed.styles.container }>
          <div style={ Feed.styles.label }>
            <img src="/assets/icons/feed.svg" />
            { this.props.name }
          </div>

          <Schema schema={this.props.schema} />
        </div>

        { this.connectedBlocks().map(this.renderConnection) }

        { this.connectedBlocks().length == 0 &&
          <NewConnection
            all_blocks={this.props.all_blocks}
            app_id={this.props.app_id}
            source_id={this.props.id}
            source_type="Feed"
            />
        }
      </div>
    );
  }

  connectedBlocks() {
    return this.props.app.connections[this.props.slug] || [];
  }

  renderConnection(connection, index) {
    return (
      <Connection
        key={index}
        {...this.props.app.blocks[connection]}
        app={this.props.app}
        all_blocks={this.props.all_blocks}
        app_id={this.props.app_id}
      />
    );
  }
}

Feed.propTypes = Object.assign({}, PropDefinitions.feed, {
  app_id: React.PropTypes.number.isRequired,
  schema: React.PropTypes.object.isRequired,
  app: React.PropTypes.shape(PropDefinitions.app).isRequired,
});

Feed.styles = {
  container: {
    border: "1px solid #ddd",
    padding: "0.75rem",
  },
  label: {
    alignItems: "center",
    display: "flex",
    flex: "0 1 auto",
  },
}

export default Feed;
