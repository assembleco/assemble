class AppCanvas extends React.Component {
  render() {
    return (
      <div className={"app-canvas " + this.props.border_class}>
        { this.props.feeds.map((feed, index) => <Feed key={index} {...feed} />) }
      </div>
    );
  }
}

const Feed = function(props) {
  return (
    <div className="app-canvas-entry-feed">
      <div className="app-canvas-feed-element">
        <img src="/assets/icons/feed.svg" />
        { props.name }
      </div>

      { props.connections.map((connection, index) =>
        <Connection key={index} {...connection} />
      )}
    </div>
  );
}

const Connection = function(props) {
  return (
    <div>
       <div className="app-canvas-connection"></div>

       <div className="app-canvas-block-element">
         <img src={"/assets/" + props.icon} />
         { props.name }
       </div>

       { props.connections.map((connection, index) =>
         <Connection key={index} {...connection} />
       ) }
    </div>
  );
}
