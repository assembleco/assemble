import Connection from "components/app_canvas/connection.es6"
import NewConnection from "components/app_canvas/new_connection.es6"

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.renderConnection = this.renderConnection.bind(this);
  }

  render() {
    return (
      <div className="app-canvas-entry-feed" style={{ overflow: "hidden" }}>
        <div className="app-canvas-feed-element">
          <img src="/assets/icons/feed.svg" />
          { this.props.name }
        </div>

        { this.props.connections.map(this.renderConnection) }

        { this.props.connections.length == 0 &&
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

  renderConnection(connection, index) {
    if(connection)
      return (
        <Connection
          key={index}
          {...connection}
          all_blocks={this.props.all_blocks}
          app_id={this.props.app_id}
        />
      );
  }
}

export default Feed;
