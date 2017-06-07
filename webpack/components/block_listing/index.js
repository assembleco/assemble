import React from "react"
import styled from "styled-components"
import dateFormat from "dateformat"
import Gravatar from "react-gravatar"

import Logo from "components/logo"

const BlockListing = (props) => (
  <ListItem
    href={`/blocks/${props.id}`}
    >
    <Icon/>

    {props.name}

    <Author>
      <Avatar
        email={props.user.email}
        alt={`Avatar for ${props.user.handle}`}
        />

      <AuthorInfo>
        <div>Created by {props.user.handle}</div>
        <div>on {dateFormat(props.created_at, "mmmm d, yyyy")}</div>
      </AuthorInfo>
    </Author>
  </ListItem>
)

const ListItem = styled.a`
  background-color: white;
  border-radius: 4px;
  color: black;
  display: inline-block;
  flex: 1 1 20%;
  margin: 0.75rem;
  padding: 1.5rem
  border: 1px solid #ddd;
  text-align: center;
  margin-right: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 0.75rem;
`

const Icon = styled(Logo)`
  display: block;
  height: 3em;
  margin: auto auto 0.75rem;
`

const AuthorInfo = styled.div`
  display: inline-block;
`

const Avatar = styled(Gravatar)`
  border-radius: 50%;
  display: inline-block;
  height: 3em;
`

const Author = styled.div`
  color: gray;
  margin-bottom: 0;
  margin-top: 0.75rem;
`

export default BlockListing
