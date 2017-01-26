class Block extends React.Component {
  render() {
    return (
      <div style={Block.styles.container}>
        <div style={Block.styles.schema}>
          <SchemaBuilder initialValue={this.props.schema} />
        </div>

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
  schema: {
    marginBottom: "0.75rem",
  },
}

export default Block;
