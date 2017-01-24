import Radium from "radium"
import Feed from "components/app_canvas/feed.es6"

import Colors from "styles/colors.es6"

class AppCanvas extends React.Component {
  constructor(props) {
    super(props);

    this.addNewFeed = this.addNewFeed.bind(this);
  }

  render() {
    return (
      <div style={{ paddingTop: "1.5rem" }}>

        <div>
          <label>Listen for events from a new feed</label>
          <select onChange={this.addNewFeed}>
            <option value="select">Select a feed to listen to</option>

            { this.props.all_feeds.map((option, index) =>
              <option key={option.value} value={option.value}>{option.label}</option>
            ) }
          </select>
        </div>

        <div style={[
          Colors(this.props.app.id),
          {
            display: "flex",
            justifyContent: "space-around",
            overflow: "hidden",
            overflow: "scroll",
            padding: "$base-spacing",
          },
        ]} >
          { this.props.app.feeds.map((feed, index) =>
              <Feed key={index} {...feed} all_blocks={this.props.all_blocks} app_id={this.props.app.id} />
          ) }
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

export default Radium(AppCanvas);
