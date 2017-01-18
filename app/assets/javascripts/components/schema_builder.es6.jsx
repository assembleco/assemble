class SchemaBuilder extends React.Component {
  constructor(props) {
    super(props);

    const schema = new Freezer(JSON.parse(this.props.initialValue)).get();

    this.state = {
      schema: schema
    }

    this.listener = schema.getListener();

    this.updateForm = this.updateForm.bind(this);
  }

  render () {
    return (
      <div style={{ marginBottom: '3rem' }}>
        <SchemaBuilderGenericAttribute schema={this.state.schema} />
      </div>
    );
  }

  componentDidMount() {
    this.listener.on('update', (updated) => {
      this.setState({ schema: updated });
      this.updateForm();
    });
  }

  updateForm() {
    $(this.props.formElement).val(JSON.stringify(this.state.schema));
  }
}

class SchemaBuilderGenericAttribute extends React.Component {
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
      object: SchemaBuilderObjectAttribute,
      string: SchemaBuilderStringAttribute,
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

class SchemaBuilderObjectAttribute extends React.Component {
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
    return <SchemaBuilderGenericAttribute
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
    const requiredIndex = this.props.schema.required.indexOf(childName);

    let update = this.props.schema.pivot();
    update = update.required.splice(requiredIndex, 1);

    if(requiredIndex != -1)
      update.properties.remove(childName);
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

class SchemaBuilderStringAttribute extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <span key="type">String</span>;
  }
}

SchemaBuilder.propTypes = {
  initialValue: React.PropTypes.string
};
