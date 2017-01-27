import Connection from "components/app_canvas/connection.es6"
import NewConnection from "components/app_canvas/new_connection.es6"
import Schema from "components/app_canvas/schema.es6"

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
  schema: React.PropTypes.object.isRequired,

  connections: React.PropTypes.objectOf(React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.number.isRequired,
    slug: React.PropTypes.string.isRequired,
  }))).isRequired,
};

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
