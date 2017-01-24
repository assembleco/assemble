import NewConnection from "components/app_canvas/new_connection.es6"

class Connection extends React.Component {
  render() {
    return (
      <div>
        <div className="app-canvas-connection"></div>

        <div className="app-canvas-block-element">
          <img
            src={"/assets/" + this.props.icon}
            style={ {
             height: "2em",
             marginRight: "0.75rem",
            } }
            />

          { this.props.name }
        </div>

        { this.connectedBlocks().map((connection, index) =>
            connection
            ? <Connection
              key={index}
              {...connection}
              all_blocks={this.props.all_blocks}
              app_id={this.props.app_id}
              connections={this.props.connections}
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
    return this.props.connections[this.props.slug] || [];
  }
}

Connection.propTypes = {
  app_id: React.PropTypes.number.isRequired,
  all_blocks: React.PropTypes.array,

  connections: React.PropTypes.objectOf(React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.number.isRequired,
    slug: React.PropTypes.string.isRequired,
  }))).isRequired,
}

export default Connection;
