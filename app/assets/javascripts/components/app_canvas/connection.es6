import PropDefinitions from "prop_definitions.es6"
import NewConnection from "components/app_canvas/new_connection.es6"
import Block from "components/app_canvas/block.es6"

class Connection extends React.Component {
  render() {
    return (
      <div>
        <div className="app-canvas-connection"></div>

        <Block
          icon={this.props.icon}
          name={this.props.name}
          slug={this.props.slug}
          schema={this.props.schema}
          app={this.props.app}
          />

        { this.connectedBlocks().map((connection, index) =>
            connection
            ? <Connection
              key={index}
              {...connection}
              all_blocks={this.props.all_blocks}
              app_id={this.props.app_id}
              app={this.props.app}
              />
            : ""
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
  app_id: React.PropTypes.number.isRequired,
  all_blocks: React.PropTypes.array,
  app: PropDefinitions.app.isRequired,
}

export default Connection;
