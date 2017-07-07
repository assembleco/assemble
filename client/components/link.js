import React from "react"
import styled from "styled-components"
import { Link as RouterLink } from 'react-router-dom'
import colors from "styles/colors"

const Link = (props) => (
  props.external

  ? <ExternalLink href={props.to}>
      {props.children}
    </ExternalLink>

  : <InternalLink to={props.to}>
      {props.children}
    </InternalLink>
)

const ExternalLink = styled.a`
  color: ${colors.blue};
`

const InternalLink = styled(RouterLink)`
  color: ${colors.blue};
`

export default Link
