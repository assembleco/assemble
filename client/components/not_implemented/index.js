import React from 'react';
import PropTypes from "prop-types"
import styled from "styled-components";
import colors from "styles/colors";
import Link from "components/link"

const NotImplemented = (props) => <Wrapper>
  This feature is still under construction.
  <br/>
  Please see
  <Link external to={`https://github.com/assembleapp/registry/issues/${props.issueID}`}> the GitHub issue </Link>
  for more information.
</Wrapper>

const Wrapper = styled.div`
  z-index: 1;
  background-color: ${colors.yellow};
  padding: 0.75rem;
`

NotImplemented.propTypes = {
  issueID: PropTypes.number.isRequired
}

export default NotImplemented;
