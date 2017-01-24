class AppCanvas extends React.Component {
  render() {


    return (
      <div className={"app-canvas " + this.props.border_class}>
        { this.props.app.feeds.map((feed, index) =>
            <Feed key={index} {...feed} all_blocks={this.props.all_blocks} app_id={this.props.app.id} />
        ) }
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
        <Connection key={index} {...connection} all_blocks={props.all_blocks} app_id={props.app_id} />
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
         <Connection key={index} {...connection} all_blocks={props.all_blocks} app_id={props.app_id} />
       ) }

       { props.connections.length == 0 && <AddConnection all_blocks={props.all_blocks} app_id={props.app_id} source_block_id={props.id} /> }
    </div>
  );
}

class AddConnection extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this)
  }

  render() {
    return (
      <div>
        <div className="app-canvas-connection"></div>

        <div className="app-canvas-add-element">
          <div>
            <label>Block:</label>

            <select onChange={this.onChange}>
              <option value="select">Select a block to add</option>

              { this.props.all_blocks.map((option, index) =>
                <option key={option.value} value={option.value}>{option.label}</option>
              ) }
            </select>
          </div>
        </div>
      </div>
    );
  }

  onChange(event) {
    const data = {
      connection: {
        app_id: this.props.app_id,
        source_id: this.props.source_block_id,
        source_type: "Block",
        destination_id: event.target.value,
        destination_type: "Block",
    } };

    $.post("/connections", data, () => { location.reload(); });
  }
}

export default AppCanvas;
