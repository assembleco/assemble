import Feed from "components/app_canvas/feed.es6"

import Colors from "styles/colors.es6"

class AppCanvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = { addingNewFeed: false };

    this.addNewFeed = this.addNewFeed.bind(this);
  }

  render() {
    const foo = Colors;

    return (
      <div className="app-canvas" style={ Colors(this.props.app.id) }>
        { this.props.app.feeds.map((feed, index) =>
            <Feed key={index} {...feed} all_blocks={this.props.all_blocks} app_id={this.props.app.id} />
        ) }

        <div className="app-canvas-entry-feed">
          { this.state.addingNewFeed
            ? <select onChange={this.addNewFeed}>
                <option value="select">Select a feed to listen to</option>

                { this.props.all_feeds.map((option, index) =>
                  <option key={option.value} value={option.value}>{option.label}</option>
                ) }
              </select>
            : <a onClick={() => this.setState({ addingNewFeed: true })}>Listen for events from a new feed</a>
          }
        </div>
      </div>
    );
  }

  addNewFeed(event) {
    const data = {
      connection: {
        app_id: this.props.app.id,
        source_id: event.target.value,
        source_type: "Feed",
    } };

    $.post("/connections", data, () => { location.reload(); });
  }
}

export default AppCanvas;
