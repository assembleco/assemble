import React from "react"

import GenericAttribute from "components/app_canvas/schema/generic_attribute";

class ObjectAttribute extends React.Component {
  constructor(props) {
    super(props);

    this.renderChild = this.renderChild.bind(this);
  }

  render() {
    const properties = Object.keys(this.props.schema.properties);
    const children = properties.map(this.renderChild);

    return (
      <div style={ObjectAttribute.styles.container}>
        {children}
      </div>
    );
  }

  renderChild(childProperty) {
    return <GenericAttribute
      style={{ marginLeft: "3rem" }}
      schema={this.props.schema.properties[childProperty]}
      required={this.props.schema.required.indexOf(childProperty) != -1}
      key={childProperty}
      name={childProperty}
    />
  }
}

ObjectAttribute.styles = {
  container: {
    paddingLeft: "1.5rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  }
}

export default ObjectAttribute;
