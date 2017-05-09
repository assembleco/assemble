import React from "react"
import $ from "jquery"
import styled from "styled-components"
import { Page } from 'hedron';

import logo from "images/blocks/block-4.png"

class Header extends React.Component {
  render() {
    return (
      <Background>
        <Menu width="1200px">
          <Left className="layout-column-left">
            <Logo src={logo}/>

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

        <Notice width="1200px">
          Hey there!
          <br/>
          This is Grayson, the lead developer on the project.
          You've caught me in the middle of moving across the country on a motorcycle,
          from California to Michigan.
          <br/>
          Since I'm on the road for the better part of a month,
          this project is currently in a little state of disrepair.
          <br/>
          Feel free to poke around,
          but please don't hold it against me if things don't work like you expect.
          <br/>
          I'll be back online and working on this project in June.
          Until then, you can send me messages about the project through GitHub.
          <br/>
          Thanks for understanding. Cheers!
        </Notice>
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
  current_user: React.PropTypes.string,
  docs_path: React.PropTypes.string.isRequired,
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

const Notice = styled(Menu)`
  background-color: #f2d38e;
  padding: 1.5rem;
`

const Logo = styled.img`
  height: 2em;
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
