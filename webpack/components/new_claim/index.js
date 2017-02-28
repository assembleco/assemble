import React from 'react';
import $ from "jquery";
import styled from "styled-components";

import colors from "styles/colors";
import LoadingIndicator from "components/loading_indicator";
import Section from "components/section";

class NewClaim extends React.Component {
  constructor(props) {
    super(props)

    this.state = { handle: "my_docker_id" }
  }

  render() {
    return (
      <Section>
        <h2>
          Claim your Docker ID
        </h2>

        <p>
          You must prove that you own a Docker ID
          before you can register any images that belong to that ID.
        </p>

        <p>
          To make a claim,
          upload an image to Docker Hub
          that exposes your Assemble ID in an environment variable.
          The code snippet below automates the process.
        </p>

        <p>
          Which docker ID would you like to claim?

          <DockerIdInput
          onKeyDown={this.editingKeyDown.bind(this)}
          value={this.state.handle}
          onChange={(evt) => this.setState({ handle: evt.target.value })} />
        </p>

        <p>
          Run this code on a machine with Docker
          to publish
          <a href={this.props.dockerfileURL}> a bare-bones verification image </a>
          to your account on Docker Hub.
        </p>

        <pre>
        <code>
          docker build -t {this.imageName()} {this.props.dockerfileURL}
          {"\n"}
          docker push {this.imageName()}
        </code>
        </pre>

        <p>
          Once you've uploaded the image to Docker Hub,
          we'll check to make sure it matches your Assemble username.
        </p>

        <button onClick={this.checkClaim.bind(this)}>
          Check for {this.imageName()} on Docker Hub
        </button>

        {this.renderStatus()}
      </Section>
    );
  }

  renderStatus() {
    if(this.state.loading) {
      return <LoadingIndicator/>
    } else if(this.state.response && this.state.response.status == 'failure') {
      return <FailureMessage>{this.state.response.message}</FailureMessage>;
    }
  }

  imageName() {
    return `${this.state.handle}/assemble_claim`;
  }

  checkClaim(e) {
    e.preventDefault();
    this.setState({ loading: true, response: null });

    $.post('/claims', { handle: this.state.handle }, (result) => {
      this.setState({ loading: false, response: result });

      if(result.status == 'success') {
        location.reload();
      }
    });
  }

  editingKeyDown(e) {
    // If the user just hit enter
    if (e.keyCode == 13) {
      e.stopPropagation();
      this.checkClaim(e);
    }
  }
}

const DockerIdInput = styled.input`
  width: 12rem;
  margin-bottom: 1rem;
`

const FailureMessage = styled.div`
  padding: 0.75rem;
  margin-top: 1.5rem;
  background-color: ${colors.yellow};
`

export default NewClaim;
