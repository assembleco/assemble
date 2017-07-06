import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Hint from "components/hint"

class EditableText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editedValue: null,
    }
  }

  render() {
    return (
      <span>
        {!this.props.editable || this.state.editedValue == null
          ? <span
            onClick={() => this.setState({ editedValue: this.props.initialValue })}
            role="link"
            >
              {this.props.children}
              { this.props.editable && <Hint>^ Click to edit</Hint> }
            </span>
          : <div>
              <Hint>{this.props.hint}</Hint>
              <textarea
                value={this.state.editedValue}
                onChange={(e) => this.setState({ editedValue: e.target.value })}
                onBlur={this.finishEditing.bind(this)}
                ref={(input) => { if(input) { input.focus() }}}
                style={{ marginRight: "0.5rem" }}
                />
            </div>
        }
      </span>
    );
  }

  edit() {
    this.setState({ editing: !this.state.editing });
  }

  finishEditing() {
    var newValue = this.state.editedValue;
    this.setState({ editedValue: null });
    this.props.onChange(newValue);
  }
}

EditableText.propTypes = {
  onChange: PropTypes.func.isRequired,
  editable: PropTypes.bool.isRequired,
  initialValue: PropTypes.string.isRequired,
}

const Link = styled.span`
  color: blue;
`

export default EditableText;
