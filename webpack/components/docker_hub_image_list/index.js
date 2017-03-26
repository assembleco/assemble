import React from "react";
import styled from "styled-components";
import $ from "jquery";

import colors from 'styles/colors';

class DockerHubImageList extends React.Component {
  render() {
    return (
      <ul>
        { this.renderActiveImages() }
        { this.renderInactiveImages() }
      </ul>
    );
  }

  renderActiveImages() {
    const { handle } = this.props;

    return this.props.activatedImages.map((image) =>
      <Image key={image}>
        <a href={`/blocks/${handle}/${image}`}>
          {image} >
        </a>

        <DangerLink onClick={() => this.deactivateImage(image)}>
          Remove from registry
        </DangerLink>
      </Image>
    );
  }

  renderInactiveImages() {
    return this.props.publicDockerImages.map((image) =>
      <Image key={image}>
        <span>{image}</span>

        <Link onClick={() => this.activateImage(image)} role="link">
          Register as an IronFunction
        </Link>
      </Image>
    );
  }

  activateImage(name) {
    const { handle } = this.props;

    $.post('/blocks',
        { block: { handle, name } },
        () => { location.reload(); })
  }

  deactivateImage(name) {
    const { handle } = this.props;

    $.ajax({
      type: 'delete',
      url: `/blocks/${handle}/${name}`,
      success: () => { location.reload() },
    });
  }
}

// TODO extract into a component with proper accessibility
const Link = styled.span`
  float: right;
  text-decoration: underline;
  color: ${colors.blue};
  cursor: pointer;
`

const DangerLink = styled(Link)`
  color: ${colors.red};
`

const Image = styled.li`
  padding: 0.75rem;
  margin-left: 3rem;
  border-bottom: 1px solid lightgray;
`

export default DockerHubImageList;
