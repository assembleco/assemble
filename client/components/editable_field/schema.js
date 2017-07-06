import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Schema from "components/schema"
import Hint from "components/hint"
import colors from "styles/colors"

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
        { this.props.editHint
          ? <Link role="link" onClick={this.edit.bind(this)}>
              {this.props.editHint}
            </Link>
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
  color: ${colors.blue};
  cursor: pointer;
  margin-bottom: 0.75rem;
`

export default EditableSchema;
