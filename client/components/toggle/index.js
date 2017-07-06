import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

class Toggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: props.open };
  }

  render() {
    return (
      this.state.open
      ? <div>
         <Label role="link" onClick={this.toggle.bind(this)}>
           {this.props.hideLabel}
         </Label>

          <div>
          {this.props.children}
          </div>
        </div>
      : <Label role="link" onClick={this.toggle.bind(this)}>
          {this.props.showLabel}
        </Label>
    )
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }
}

const Label = styled.div`
  color: blue;
  cursor: pointer;
`

Toggle.propTypes = {
  hideLabel: PropTypes.string.isRequired,
  open: PropTypes.bool,
  showLabel: PropTypes.string.isRequired,
}

export default Toggle;
