import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Schema from "components/schema"
import Hint from "components/hint"

class EditableSchema extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    }
  }

  render() {
    return (
      <div>
        { this.props.editable
          ? <Hint>
            As the block's author, <Link role="link" onClick={this.edit.bind(this)}>
            edit the block's input schema
            </Link> to help others understand how it works.
            </Hint>
          : ""
        }

        {this.state.editing
          ? <Schema
            onChange={this.props.onChange}
            initialValue={this.props.initialValue}
            editable
            />
          : this.props.children}
      </div>
    );
  }

  edit() {
    this.setState({ editing: !this.state.editing });
  }
}

EditableSchema.propTypes = {
  onChange: PropTypes.func.isRequired,
  editable: PropTypes.bool.isRequired,
  initialValue: PropTypes.object.isRequired,
}

const Link = styled.span`
  color: blue;
`

export default EditableSchema;
