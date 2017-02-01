import React from "react"

class Connector extends React.Component {
  render() {
    return <div style={Connector.styles.connector} />;
  }
}

Connector.styles = {
  connector: {
    content: "",
    height: "4em",
    borderRight: "2px dashed #ddd",
    width: "1.5rem",
  }

}

export default Connector;
