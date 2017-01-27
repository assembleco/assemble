import ObjectAttribute from "components/app_canvas/schema/object_attribute.es6";
import StringAttribute from "components/app_canvas/schema/string_attribute.es6";

class GenericAttribute extends React.Component {
  render() {
    const component = {
      object: ObjectAttribute,
      string: StringAttribute,
    }[this.props.schema.type];

    const nameTag = this.props.name
      ? <span
          key="name"
          style={{ marginRight: "0.5rem" }}
          >
          {this.props.name + ':'}
        </span>
      : "";

    const style = {
      alignItems: "flex-start",
      justifyContent: "space-between",
      padding: "0.5rem",
    }

    return (
      <div style={style}>
        { this.props.required ? <span>*</span> : "" }
        { nameTag }

        { React.createElement(component, this.props, null) }
      </div>
    );
  }
}

export default GenericAttribute;
