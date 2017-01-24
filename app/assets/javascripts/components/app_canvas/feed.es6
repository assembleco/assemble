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
    return this.props.connections[this.props.slug] || [];
  }

  renderConnection(connection, index) {
    if(connection)
      return (
        <Connection
          key={index}
          {...connection}
          connections={this.props.connections}
          all_blocks={this.props.all_blocks}
          app_id={this.props.app_id}
        />
      );
  }
}

Feed.propTypes = {
  id: React.PropTypes.number.isRequired,
  app_id: React.PropTypes.number.isRequired,
  slug: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,

  connections: React.PropTypes.objectOf(React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.number.isRequired,
    slug: React.PropTypes.string.isRequired,
  }))).isRequired,
};

export default Feed;
