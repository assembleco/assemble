class StringAttribute extends React.Component {
  render() {
    return <input style={StringAttribute.styles.input} />;
  }
}

StringAttribute.styles = {
  input: {
    display: "inline-block",
    width: "auto",
  }
}

export default StringAttribute;
