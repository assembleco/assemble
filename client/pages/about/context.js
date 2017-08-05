import React from "react"
import styled from "styled-components"

import { Page } from "hedron"
import scroll_down from "images/about/scroll_down.svg"

import Link from "components/link"
import Section from "components/section"

const urls = {
  docs: "https://www.notion.so/assemble/Assemble-Documentation-006d3d9b69a0409ba8c456b08acc9cf1#e6b3629c7e7e469181a334fad3721c3b",
  github: "https://github.com/assembleapp/registry",
  notion: "https://www.notion.so/assemble/Assemble-Community-c133a13e3e2645fa9d64c74d8d245705#d48e767d43584fd197e6e74f55dcb1f7",
  slack: "http://assemble-slack.herokuapp.com/",
}

const Context = ({ scrollHint }) => (
  <Wrapper width="1200px">
    { scrollHint &&
      <ScrollHint>
        <img src={scroll_down} alt="Scroll down for more" />
      </ScrollHint>
    }

    <Aside>
      <p>
      Hello!
      </p>

      <p>
      You're looking at an early take on how our platform
      can help nontechnical users leverage the power of custom technology.
      </p>

      <p>
      These features have not been built yet –
      this is simply a vision of what we'd like to achieve.
      We've published more detailed plans and roadmaps&nbsp;
      <Link external to={urls.docs}>in our documentation</Link>.
      </p>

      <p>
      We want to build our tools to be as accessible and inclusive as possible.
      To do that, it's necessary to give everyone a voice in how the tools are built.
      We'd love to hear your thoughts and ideas.
      </p>

      <p>
      Get in touch with us
      <Link external to={urls.docs}>on Slack</Link>,
      <Link external to={urls.github}>on GitHub</Link>,
      <Link external to={urls.notion}>on Notion</Link>,
      or just click on the orange circle in the corner of your screen
      and start typing.
      </p>
    </Aside>
  </Wrapper>
);

const Wrapper = styled(Page)`
  padding-top: 4.5rem;
  display: flex;
  justify-content: center;
`

const ScrollHint = styled.div`
  width: 4.5rem;
  margin-right: 1.5rem;
`

const Aside = styled(Section)`
  width: 50%;
  margin-bottom: 4.5rem;
  background-color: #f2d38e;
`

export default Context;
