import React from "react"
import PropTypes from "prop-types"
import Radium from "radium"
import $ from "jquery"

import Feed from "components/app_canvas/feed"
import EmptyState from "components/app_canvas/empty_state"

import PropDefinitions from "prop_definitions"
import Colors from "styles/colors"

class AppCanvas extends React.Component {
  constructor(props) {
    super(props);

    this.addNewFeed = this.addNewFeed.bind(this);
  }

  render() {
    return (
      <div style={{ paddingTop: "1.5rem" }}>

        <div style={[
          Colors(this.props.app.id),
          {
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "space-around",
            overflow: "hidden",
            padding: "1.5rem",
          },
        ]} >
          { this.props.app.feeds.map((feed, index) =>
            <Feed
              key={index}
              {...feed}
              app={this.props.app}
              all_blocks={this.props.all_blocks}
              app_id={this.props.app.id}
              />
          ) }

          { this.props.app.feeds.length == 0 &&
            <EmptyState all_feeds={this.props.all_feeds} onAddFeed={this.addNewFeed} />
          }
        </div>
      </div>
    );
  }

  addNewFeed(event) {
    const data = {
      subscription: {
        app_id: this.props.app.id,
        feed_id: event.target.value,
    } };

    $.post("/subscriptions", data, () => { location.reload(); });
  }
}

AppCanvas.propTypes = {
  app: PropTypes.shape(PropDefinitions.app).isRequired,

  all_blocks: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,

  all_feeds: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
}

export default Radium(AppCanvas);
