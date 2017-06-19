import React, { PureComponent } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Check from './check'
import X from './x'
import { pointerCoord } from './util'
import styled from "styled-components"

export default class Toggle extends PureComponent {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.previouslyChecked = !!(props.checked || props.defaultChecked)

    this.state = {
      checked: !!(props.checked || props.defaultChecked),
      hasFocus: false,
    }
  }

  componentWillReceiveProps (nextProps) {
    if ('checked' in nextProps) {
      this.setState({checked: !!nextProps.checked})
    }
  }

  handleClick (event) {
    const checkbox = this.input
    if (event.target !== checkbox && !this.moved) {
      this.previouslyChecked = checkbox.checked
      event.preventDefault()
      checkbox.focus()
      checkbox.click()
      return
    }

    const checked = this.props.hasOwnProperty('checked') ? this.props.checked : checkbox.checked;

    this.setState({checked})
  }

  handleTouchStart (event) {
    this.startX = pointerCoord(event).x
    this.activated = true
  }

  handleTouchMove (event) {
    if (!this.activated) return
    this.moved = true

    if (this.startX) {
      let currentX = pointerCoord(event).x
      if (this.state.checked && currentX + 15 < this.startX) {
        this.setState({ checked: false })
        this.startX = currentX
        this.activated = true
      } else if (currentX - 15 > this.startX) {
        this.setState({ checked: true })
        this.startX = currentX
        this.activated = (currentX < this.startX + 5)
      }
    }
  }

  handleTouchEnd (event) {
    if (!this.moved) return
    const checkbox = this.input
    event.preventDefault()

    if (this.startX) {
      let endX = pointerCoord(event).x
      if (this.previouslyChecked === true && this.startX + 4 > endX) {
        if (this.previouslyChecked !== this.state.checked) {
          this.setState({ checked: false })
          this.previouslyChecked = this.state.checked
          checkbox.click()
        }
      } else if (this.startX - 4 < endX) {
        if (this.previouslyChecked !== this.state.checked) {
          this.setState({ checked: true })
          this.previouslyChecked = this.state.checked
          checkbox.click()
        }
      }

      this.activated = false
      this.startX = null
      this.moved = false
    }
  }

  handleFocus (event) {
    const { onFocus } = this.props

    if (onFocus) {
      onFocus(event)
    }

    this.setState({ hasFocus: true })
  }

  handleBlur (event) {
    const { onBlur } = this.props

    if (onBlur) {
      onBlur(event)
    }

    this.setState({ hasFocus: false })
  }

  getIcon (type) {
    const { icons } = this.props
    if (!icons) {
      return null
    }
    return icons[type] === undefined
      ? Toggle.defaultProps.icons[type]
      : icons[type]
  }

  render () {
    const { className, icons: _icons, ...inputProps } = this.props

    const classes = classNames('react-toggle', {
      'react-toggle--checked': this.state.checked,
      'react-toggle--focus': this.state.hasFocus,
      'react-toggle--disabled': this.props.disabled,
    }, className)

    return (
      <ReactToggle
        disabled={this.props.disabled}
        onClick={this.handleClick}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}>

        <Track checked={this.state.checked}>
          <TrackCheck checked={this.state.checked}>
            {this.getIcon('checked')}
          </TrackCheck>

          <TrackX checked={this.state.checked}>
            {this.getIcon('unchecked')}
          </TrackX>
        </Track>

        <ToggleSwitchThumb checked={this.state.checked} />

        <ScreenreaderInput
          {...inputProps}
          innerRef={ref => { this.input = ref }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          type='checkbox' />
      </ReactToggle>
    )
  }
}

Toggle.displayName = 'Toggle'

Toggle.defaultProps = {
  icons: {
    checked: <Check />,
    unchecked: <X />,
  },
}

Toggle.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  'aria-labelledby': PropTypes.string,
  'aria-label': PropTypes.string,
  icons: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      checked: PropTypes.node,
      unchecked: PropTypes.node,
    }),
  ]),
}

const ToggleSwitchThumb = styled.div`
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  position: absolute;
  top: 1px;
  left: ${({checked}) => checked ? "27px" : "1px"};
  width: 22px;
  height: 22px;
  border: 1px solid ${({checked}) => checked ? checkedColor : unCheckedColor};
  border-radius: 50%;
  background-color: #FAFAFA;

  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  -webkit-transition: all 0.25s ease;
  -moz-transition: all 0.25s ease;
  transition: all 0.25s ease;
`

ToggleSwitchThumb.defaultProps = {
  checked: false,
}

const ScreenreaderInput = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`

const checkedColor = "#19AB27"
const unCheckedColor = "#4D4D4D"

const Track = styled.div`
  width: 50px;
  height: 24px;
  padding: 0;
  border-radius: 30px;
  background-color: ${({checked}) => checked ? checkedColor : unCheckedColor };
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  transition: all 0.2s ease;
`

Track.defaultProps = {
  checked: false
}

const TrackCheck = styled.div`
  position: absolute;
  width: 14px;
  height: 10px;
  top: 0px;
  bottom: 0px;
  margin-top: auto;
  margin-bottom: auto;
  line-height: 0;
  left: 8px;
  opacity: ${({checked}) => checked ? 1 : 0};
  -webkit-transition: opacity 0.25s ease;
  -moz-transition: opacity 0.25s ease;
  transition: opacity 0.25s ease;
`

TrackCheck.defaultProps = {
  checked: false
}

const TrackX = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  top: 0px;
  bottom: 0px;
  margin-top: auto;
  margin-bottom: auto;
  line-height: 0;
  right: 10px;
  opacity: ${({ checked }) => checked ? 0 : 1};
  -webkit-transition: opacity 0.25s ease;
  -moz-transition: opacity 0.25s ease;
  transition: opacity 0.25s ease;
`

TrackX.defaultProps = {
  checked: false
}

const ReactToggle = styled.div`
  touch-action: pan-x;

  display: inline-block;
  position: relative;
  cursor: ${({disabled}) => disabled ? "not-allowed" : "pointer" };
  background-color: transparent;
  border: 0;
  padding: 0;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;

  ${({disabled}) => ( disabled && `
    -webkit-transition: opacity 0.25s;
    transition: opacity 0.25s;
    opacity: 0.5;
  `) };
`

ReactToggle.defaultProps = {
  disabled: false,
}
