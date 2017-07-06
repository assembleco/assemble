import React from "react"
import PropTypes from "prop-types"
import $ from "jquery"
import styled from "styled-components"
import { Page } from 'hedron';

import { graphql } from "react-apollo"
import SessionQuery from "graphql/session.gql"

import Logo from "../logo"

class Header extends React.Component {
  render() {
    return (
      <Background>
        <Menu width="1200px">
          <Left>
            <Logo continuous />

            <Link href="/" className="header-title">Assemble</Link>

            <Link href="https://www.notion.so/assemble/Assemble-Documentation-006d3d9b69a0409ba8c456b08acc9cf1#e6b3629c7e7e469181a334fad3721c3b">
              Docs
            </Link>

            <Link href="/about">About</Link>
            <Link href="https://github.com/assembleapp/registry">GitHub</Link>
          </Left>

          <Right>
            { this.props.data.session ?
              <div>
                <span>{this.props.data.session.person.handle}</span>
                <Link className="button" onClick={this.sign_out}>Sign out</Link>
              </div>
              :
              <Link className="button" href="/session/new">Sign in with GitHub</Link>
            }
          </Right>
        </Menu>
      </Background>
    );
  }

  sign_out() {
    $.ajax({
      url: '/session',
      type: 'DELETE',
      success: () => { window.location = window.location.pathname },
    });
  }
}

const Background = styled.div`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);;
  margin-bottom: 1.5rem;
  width: 100%;
`

const Menu = styled(Page)`
  align-items: center;
  display: flex;
  padding-bottom: 0.75rem;
  padding-top: 0.75rem;
`

const Left = styled.div`
  align-items: center;
  display: flex;
  width: 50%;
`

const Right = styled(Left)`
  justify-content: flex-end;
  text-align: right;
`

const Link = styled.a`
  margin-left: 1.5rem;
`

const HeaderWithData = graphql(SessionQuery)(Header)

export default HeaderWithData;
