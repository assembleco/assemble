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

        { this.props.connections.map(this.renderConnection.bind(this)) }
      </div>
    );
  }

  renderConnection(connection) {
    if(connection.team) {
      // This is the Slack service
      return <Connection key={connection.team}>
        Connected to team <code>{connection.team}</code>&nbsp;
        by user <code>{connection.handle}</code>
      </Connection>
    } else {
      // This is the GitHub service
      return <Connection key={connection.handle}>
        Connected to user <code>{connection.handle}</code>
      </Connection>
    }
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

const Connection = styled.div`
  border-top: 1px solid lightgrey;
  padding: 0.5rem;
`

Service.propTypes = {
  auth_route: React.PropTypes.string.isRequired,
  domain: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
}

export default Radium(Service);
