import React from "react"
import styled from "styled-components"
import { Link as RouterLink } from 'react-router-dom'

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
  color: #4271ae;
`

const InternalLink = styled(RouterLink)`
  color: #4271ae;
`

export default Link
