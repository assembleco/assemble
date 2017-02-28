import React from 'react';
import styled from "styled-components";
import colors from "styles/colors";

const Wrapper = styled.div`
z-index: 1;
background-color: ${colors.yellow};
padding: 0.75rem;
`

const NotImplemented = (props) => <Wrapper>
  This feature is still under construction.
  <br/>
  Please see
  <a href={`https://github.com/assembleapp/registry/${props.issueID}`}> the GitHub issue </a>
  for more information.
</Wrapper>

NotImplemented.propTypes = {
  issueID: React.PropTypes.number.isRequired
}

export default NotImplemented;
