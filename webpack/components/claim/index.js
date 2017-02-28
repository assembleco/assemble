import React from 'react';
import styled from "styled-components";

import Section from "components/section";
import Hint from "components/hint";
import DockerHubImageList from "components/docker_hub_image_list";

class Claim extends React.Component {
  render() {
    return (
      <Section>
        <h2>
          <a href={`https://hub.docker.com/u/${this.props.handle}`}>
            docker: {this.props.handle}
          </a>
        </h2>

        <DockerHubImageList
          handle={this.props.handle}
          activatedImages={this.props.activatedImages}
          publicDockerImages={this.props.publicDockerImages}
          />

        <UsageHint>
          Don't see the image that you're looking for?
          Make sure it's published publicly on Docker Hub.
        </UsageHint>
      </Section>
    );
  }
}

const UsageHint = styled(Hint)`
margin-top: 1.5rem;
`

Claim.propTypes = {
  handle: React.PropTypes.string.isRequired,
  activatedImages: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  publicDockerImages: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
}

export default Claim;
