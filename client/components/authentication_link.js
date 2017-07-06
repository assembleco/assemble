import React from "react"
import styled from "styled-components"

const AuthenticationLink = ({name, oauth_provider}) => (
  <a href={`/auth/${oauth_provider}`}>
    Sign in to {name}
  </a>
)

export default AuthenticationLink;
