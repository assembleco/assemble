import Schema from "components/app_canvas/schema.es6"

class Block extends React.Component {
  render() {
    return (
      <div style={Block.styles.container}>
        <Schema schema={this.props.schema} />

        <div style={Block.styles.label}>
          <img
            src={"/assets/" + this.props.icon}
            style={ {
             height: "2em",
             marginRight: "0.75rem",
            } }
            />

          { this.props.name }
        </div>
      </div>
    );
  }
}

Block.propTypes = {
  icon: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  schema: React.PropTypes.object.isRequired,
}

Block.styles = {
  container: {
    border: "1px solid #ddd",
    padding: "0.75rem",
  },
  label: {
    display: "flex",
    alignItems: "center",
  },
}

export default Block;
