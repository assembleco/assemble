import React from "react"

import GenericAttribute from "./generic_attribute";

class ObjectAttribute extends React.Component {
  constructor(props) {
    super(props);

    this.renderChild = this.renderChild.bind(this);
    this.removeChild = this.removeChild.bind(this);
    this.renameChild = this.renameChild.bind(this);
    this.changeChildRequirement = this.changeChildRequirement.bind(this);
    this.addChild = this.addChild.bind(this);
  }

  render() {
    const properties = Object.keys(this.props.schema.properties);
    const children = properties.map(this.renderChild);

    return (
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <span>Object</span>
        {children}
        <span>
          <span style={{ marginRight: "0.5rem" }}>Add a child:</span>
          <a onClick={() => this.addChild("string")} style={{ marginRight: "0.5rem" }}>""</a>
          <a onClick={() => this.addChild("object")} style={{ marginRight: "0.5rem" }}>{"{}"}</a>
        </span>
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
      onRemove={this.removeChild}
      onRename={this.renameChild}
      onChildRequirementChange={this.changeChildRequirement}
    />
  }

  addChild(childType) {
    const defaultChildren = {
      string: { type: "string" },
      object: { type: "object", properties: {}, required: [] }
    }

    const childObject = defaultChildren[childType]

    this.props.schema.properties.set("field_name", childObject);
  }

  removeChild(childName) {
    let update = this.props.schema.pivot();
    update.properties.remove(childName);

    const requiredIndex = this.props.schema.required.indexOf(childName);
    if(requiredIndex != -1)
      update = update.required.splice(requiredIndex, 1);
  }

  renameChild(oldName, newName) {
    if(oldName == newName) return;

    const childAttrs = this.props.schema.properties[oldName];
    const requiredIndex = this.props.schema.required.indexOf(oldName);

    let update = this.props.schema.pivot();
    update = update.properties.set(newName, childAttrs);
    update = update.properties.remove(oldName);

    if(requiredIndex != -1)
      update.required.splice(requiredIndex, 1, newName);
  }

  changeChildRequirement(childName, required) {
    const requiredIndex = this.props.schema.required.indexOf(childName);

    // If we need to add the item to the required array
    if(required && requiredIndex == -1)
      this.props.schema.required.append(childName);

    // If we need to remove the item from the required array
    if(!required && requiredIndex != -1)
      this.props.schema.required.splice(requiredIndex, 1);
  }
}

export default ObjectAttribute;
