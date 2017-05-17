import React from "react"
import PropTypes from "prop-types"
import $ from "jquery"
import styled from "styled-components"
import { Page } from 'hedron';

import Logo from "../logo"

class Header extends React.Component {
  render() {
    return (
      <Background>
        <Menu width="1200px">
          <Left className="layout-column-left">
            <Logo continuous />

            <Link href="/" className="header-title">Assemble</Link>
            <Link href={this.props.docs_path}>Docs</Link>
            <Link href="/about">About</Link>
            <Link href="https://github.com/assembleapp/registry">GitHub</Link>
          </Left>

          <Right className="layout-column-right">
            { this.props.current_user ?
              <div>
                <Link href="/user_info">{this.props.current_user}</Link>
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
      path: '/session',
      type: 'DELETE',
      success: () => { window.reload() },
    });
  }
}

Header.propTypes = {
  current_user: PropTypes.string,
  docs_path: PropTypes.string.isRequired,
}

const Background = styled.div`
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);;
`

const Menu = styled(Page)`
  display: flex;
  align-items: center;
  padding-bottom: 0.75rem;
  padding-top: 0.75rem;
`

const Left = styled.div`
  display: flex;
  align-items: center;
`

const Right = styled(Left)`
  justify-content: flex-end;
  text-align: right;
`

const Link = styled.a`
  margin-left: 1.5rem;
`

export default Header;
