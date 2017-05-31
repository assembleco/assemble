import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

class Toggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: true };
  }

  render() {
    const date = new Date(this.props.created_at);

    if(this.state.open)
      return(
        <Label role="link" onClick={this.toggle.bind(this)}>
          {this.props.showLabel}
        </Label>
      )
    else
      return(
        <div>
          <Label role="link" onClick={this.toggle.bind(this)}>
            {this.props.hideLabel}
          </Label>

          <div>
          {this.props.children}
          </div>
        </div>
      )
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }
}

const Label = styled.div`
  background-color: lightgray;
  color: blue;
  cursor: pointer;
`

export default Toggle;
