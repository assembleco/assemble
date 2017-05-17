import React from 'react';
import PropTypes from "prop-types"
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
  <a href={`https://github.com/assembleapp/registry/issues/${props.issueID}`}> the GitHub issue </a>
  for more information.
</Wrapper>

NotImplemented.propTypes = {
  issueID: PropTypes.number.isRequired
}

export default NotImplemented;
