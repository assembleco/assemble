import $ from "jquery"
import PropTypes from "prop-types"
import React from "react"
import SessionQuery from "graphql/session.gql"
import styled from "styled-components"
import { Page } from 'hedron';
import { graphql } from "react-apollo"

import Link from "components/link"
import Logo from "components/logo"

class Header extends React.Component {
  render() {
    return (
      <Background>
        <Menu width="1200px">
          <Left>
            <Logo continuous />

            <Link to="/">Assemble</Link>
            <Link to="/about">About</Link>

            <Link external to="https://www.notion.so/assemble/Assemble-Documentation-006d3d9b69a0409ba8c456b08acc9cf1#e6b3629c7e7e469181a334fad3721c3b">
              Docs
            </Link>

            <Link external to="https://github.com/assembleapp/registry">
              GitHub
            </Link>
          </Left>

          <Right>
            { this.props.data.session
              ? <div>
                  <span>{this.props.data.session.person.handle}</span>

                  <SignOutButton className="button" onClick={this.sign_out}>
                    Sign out
                  </SignOutButton>
                </div>
              : <Link external className="button" to="/session/new">
                  Sign in with GitHub
                </Link>
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

  a {
    margin-left: 1.5rem;
  }
`

const Right = styled(Left)`
  justify-content: flex-end;
  text-align: right;
`

const SignOutButton = styled.a`
  margin-left: 1.5rem;
`

const HeaderWithData = graphql(SessionQuery)(Header)

export default HeaderWithData;
