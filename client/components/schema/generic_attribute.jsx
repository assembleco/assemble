import React from "react"
import styled from "styled-components"

import ObjectAttribute from "./object_attribute";
import StringAttribute from "./string_attribute";

import EditableField from "components/editable_field"
import Link from "components/link"

class GenericAttribute extends React.Component {
  render() {
    const component = {
      object: ObjectAttribute,
      string: StringAttribute,
    }[this.props.schema.type];

    const nameTag = this.props.name
      ? <EditableField.String
      editable
      onChange={(newName) => this.props.onRename(this.props.name, newName)}
      initialValue={this.props.name}
      >
        <Label>{ this.props.name + ':' }</Label>
      </EditableField.String>
      : "";

    const requiredCheckbox = this.props.editable && this.props.onChildRequirementChange
      ?  <input
          type="checkbox"
          checked={this.props.required}
          onChange={(e) => this.props.onChildRequirementChange(this.props.name, e.target.checked)}
        />
      : "";

    const removeLink = this.props.editable && this.props.onRemove
      ? <Link external onClick={() => this.props.onRemove(this.props.name)}>[X]</Link>
      : "";

    return (
      <Wrapper>
        { nameTag }

        { React.createElement(component, this.props, null) }

        { requiredCheckbox }
        { removeLink }
      </Wrapper>
    );
  }
}

const Label = styled.span`
  margin-right: 0.5rem;
  text-decoration: underline;
  cursor: pointer;
`

const Wrapper = styled.div`
  align-items: flex-start;
  border: 1px solid gray;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
`

export default GenericAttribute;
