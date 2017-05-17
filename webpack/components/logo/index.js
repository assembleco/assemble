import styled from "styled-components"

import React from "react";

const face_colors = [
  '#a8cfd9', // blue
  '#a9dbcb', // green
  '#dba5cd', // pink
  '#fab09c', // orange
  '#d68282', // red
  '#f2d28f', // yellow
]

const depth = 30;

class Logo extends React.Component {
  constructor(props) {
    super(props);

    this.listeners = {
      spin: this._spin.bind(this),
      reset: this._reset.bind(this)
    };

    this.state = {
      x: 0,
      y: 0,
      z: 0,
    };
  }

  render() {
    let { x, y, z } = this.state;
    let { theme, depth } = this.props;

    return (
      <OuterContainer>
        <Container>
          <span ref={ ref => this.container = ref } >
            <CubeOuter
              style={{
                width: `${depth}px`,
                height: `${depth}px`,
                transform: `translateX(-50%)
                scale3d(1,1,1)
                rotateX(${x}deg)
                rotateY(${y}deg)
                rotateZ(${z}deg)`
              }}>
                { this._getFaces() }
            </CubeOuter>
          </span>
        </Container>
      </OuterContainer>
    );
  }

  componentDidMount() {
    let { hover, continuous, repeatDelay } = this.props;

    if (hover) {
      this.container.addEventListener("mouseenter", this.listeners.spin);
      this.container.addEventListener("mouseleave", this.listeners.reset);

    } else if (continuous) {
      let lastTime = performance.now();
      let animation = () => {
        let axis = this._getRandomAxis();
        let nowTime = performance.now();
        let deltaTime = nowTime - lastTime;

        if (repeatDelay <= deltaTime) {
          let obj = {};

          let newState = this.state;
          newState[axis] = this.state[axis] + 90;

          this.setState(newState);
          lastTime = performance.now();
        }

        this._requestAnimation = requestAnimationFrame(animation);
      };
      animation();
    }
  }

  componentWillUnmount() {
    let { hover, continuous } = this.props;

    if (hover) {
      this.container.removeEventListener("mouseenter", this.listeners.spin);
      this.container.removeEventListener("mouseleave", this.listeners.reset);

    } else if (continuous) {
      cancelAnimationFrame(this._requestAnimation);
    }
  }

  /**
   * Get all faces for a cube
   *
   * @return {array} - An array of nodes
   */
  _getFaces() {
    return [
      "rotateX(0deg)",
      "rotateX(-90deg)",
      "rotateX(90deg)",
      "rotateY(-90deg)",
      "rotateY(90deg)",
      "rotateY(180deg)"
    ].map((rotation, i) => {
      return (
        <CubeFace
          key={ i }
          style={{
            transform: `${rotation} translateZ(${ this.props.depth / 2 }px)`,
            background: face_colors[i],
          }} />
      );
    });
  }

  /**
   * Get a random axis
   *
   * @return {string} - A random axis (i.e. x, y, or z)
   */
  _getRandomAxis() {
    let axes = Object.keys(this.state);

    return axes[ Math.floor(Math.random() * axes.length) ];
  }

  /**
   * Spin the cubes in opposite directions semi-randomly
   *
   * @param {object} e - Native event
   */
  _spin(e) {
    let obj = {};
    let axis = this._getRandomAxis();
    let sign = Math.random() < 0.5 ? -1 : 1;

    obj[axis] = sign * 90;

    this.setState(obj);
  }

  /**
   * Rotate the cubes back to their original position
   *
   * @param {object} e - Native event
   */
  _reset(e) {
    this.setState({
      x: 0,
      y: 0,
      z: 0
    });
  }
}

Logo.propTypes = {
  hover: React.PropTypes.bool,
  theme: React.PropTypes.string,
  depth: React.PropTypes.number,
  repeatDelay: React.PropTypes.number
};

Logo.defaultProps = {
  hover: false,
  theme: "dark",
  depth: 30,
  repeatDelay: 2000,
};

const OuterContainer = styled.div`
  height: ${depth * 1.5}px;
  width: ${depth * 1.5}px;
`

const Container = styled.span`
  display: block;
  paddingBottom: ${depth * 0.5}px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(-33.5deg) rotateY(45deg);
  width: ${depth}px;
`

const CubeOuter = styled.figure`
  -webkit-transform-style: preserve-3d;
  -webkit-transition: -webkit-transform 1000ms;
  display: inline-block;
  transform-style: preserve-3d;
  transition: -webkit-transform 1000ms;
  transition: transform 1000ms, -webkit-transform 1000ms;
  transition: transform 1000ms;
`

const CubeFace = styled.section`
  -webkit-transition-delay: 0.2s;
  -webkit-transition: border-width 0.2s;
  background: rgba(141, 214, 249, 1);
  border: 2px solid #000;
  height: 100%;
  position: absolute;
  transition-delay: 0.2s;
  transition: border-width 0.2s;
  width: 100%;
`

export default Logo;
