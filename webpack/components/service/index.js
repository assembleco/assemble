import React from "react"
import Radium from "radium"
import styled from "styled-components";

class Service extends React.Component {
  render() {
    return (
      <div className="section layout-center">
        <Name>{this.props.name}</Name>

        <Logo src={`https://logo.clearbit.com/${this.props.domain}`}/>

        <Button className="button" href={this.props.auth_route}>Connect</Button>

        <p className="hint">
        {this.props.hint}
        </p>
      </div>
    );
  }
}

const Logo = styled.img`
  height: 3rem;
  width: 3rem;
  display: inline-block;
  margin-right: 1rem;
`

const Name = styled.h2`
`

const Button = styled.a`
  float: right;
`

Service.propTypes = {
  auth_route: React.PropTypes.string.isRequired,
  domain: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
}

export default Radium(Service);
