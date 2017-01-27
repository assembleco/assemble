import Connector from "components/app_canvas/connector.es6"

class NewConnection extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this)
  }

  render() {
    return (
      <div>
        <Connector />

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
        source_id: this.props.source_id,
        source_type: this.props.source_type,
        destination_id: event.target.value,
        destination_type: "Block",
    } };

    $.post("/connections", data, () => { location.reload(); });
  }
}

export default NewConnection;
