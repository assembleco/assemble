import React from "react"
import styled from "styled-components"
import dateFormat from "dateformat"
import Gravatar from "react-gravatar"

import Logo from "components/logo"

const BlockListing = (props) => (
  <a
    href={`/blocks/${props.user.handle}/${props.name}`}
    className="list-item block-listing"
    >
    <Logo/>

    {props.name}

    <div className="author">
      <Gravatar
        email={props.user.email}
        className="avatar"
        alt={`Avatar for ${props.user.handle}`}
        />

      <div className="author-info">
        <div>Created by {props.user.handle}</div>
        <div>on {dateFormat(props.created_at, "mmmm d, yyyy")}</div>
      </div>
    </div>
  </a>
)

export default BlockListing
