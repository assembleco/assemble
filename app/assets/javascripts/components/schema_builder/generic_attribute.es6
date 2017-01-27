import ObjectAttribute from "components/schema_builder/object_attribute.es6";
import StringAttribute from "components/schema_builder/string_attribute.es6";

class GenericAttribute extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editedName: null
    };

    this.finishEditing = this.finishEditing.bind(this);
    this.editingKeyDown = this.editingKeyDown.bind(this);
  }

  render() {
    const component = {
      object: ObjectAttribute,
      string: StringAttribute,
    }[this.props.schema.type];

    const nameTag = this.props.name
      ? this.state.editedName == null
        ? <span
            key="name"
            onClick={() => this.setState({ editedName: this.props.name })}
            role="link"
            style={{ marginRight: "0.5rem", textDecoration: "underline", cursor: "pointer" }}
            >
            {this.props.name + ':'}
          </span>
        : <input
            type='text'
            value={this.state.editedName}
            onChange={(e) => this.setState({ editedName: e.target.value })}
            onBlur={this.finishEditing}
            ref={(input) => { if(input) { input.focus() }}}
            onKeyDown={this.editingKeyDown}
            style={{ marginRight: "0.5rem" }}
            ></input>
      : "";

    const requiredCheckbox = this.props.onChildRequirementChange
      ?  <input
          type="checkbox"
          checked={this.props.required}
          onChange={(e) => this.props.onChildRequirementChange(this.props.name, e.target.checked)}
        />
      : "";

    const removeLink = this.props.onRemove
      ? <a onClick={() => this.props.onRemove(this.props.name)}>[X]</a>
      : "";

    const style = {
      alignItems: "flex-start",
      border: "1px solid gray",
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "0.5rem",
      padding: "0.5rem",
    }

    return (
      <div style={style}>
        { nameTag }

        { React.createElement(component, this.props, null) }

        { requiredCheckbox }
        { removeLink }
      </div>
    );
  }

  editingKeyDown(e) {
    // If the user just hit enter
    if (e.keyCode == 13) {
      e.stopPropagation();
      this.finishEditing();
    }
  }

  finishEditing() {
    var newName = this.state.editedName;
    this.setState({ editedName: null });
    this.props.onRename(this.props.name, newName);
  }
}

export default GenericAttribute;
