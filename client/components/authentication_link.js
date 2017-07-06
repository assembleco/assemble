import React from "react"
import styled from "styled-components"
import Link from "components/link"

const AuthenticationLink = ({name, oauth_provider}) => (
  <Link external to={`/auth/${oauth_provider}`}>
    Sign in to {name}
  </Link>
)

export default AuthenticationLink;
