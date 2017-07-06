import Gravatar from "react-gravatar"
import Logo from "components/logo"
import React from "react"
import dateFormat from "dateformat"
import styled from "styled-components"
import { Link } from "react-router-dom"

const BlockListing = (props) => (
  <BlockLink to={`/blocks/${props.id}`} >
    <Icon/>

    {props.name}

    <Author>
      <Avatar
        email={props.author.email}
        alt={`Avatar for ${props.author.handle}`}
        />

      <AuthorInfo>
        <div>Created by {props.author.handle}</div>
        <div>on {dateFormat(props.created_at, "mmmm d, yyyy")}</div>
      </AuthorInfo>
    </Author>
  </BlockLink>
)

const BlockLink = styled(Link)`
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
