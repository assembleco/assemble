import React from "react"
import styled from "styled-components"

import { Page } from "hedron"

const Step = ({ image, children }) => (
  <Wrapper>
    <Section width="1200px">
      <P>{children}</P>

      <Image src={image}/>
    </Section>
  </Wrapper>
);

const image_size = "60%";

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  width: 100vw;

  &:before {
    content: '';
    display: block;
    height: 100%;
    opacity: 0.25;
    position: absolute;
    width: 100%;
    z-index: -1;
  }

  &:nth-child(4n+1):before { background-color: #acdbcc; }
  &:nth-child(4n+2):before { background-color: #9bcad6; }
  &:nth-child(4n+3):before { background-color: #f2d38e; }
  &:nth-child(4n+4):before { background-color: #fb987f; }
`

const Section = styled(Page)`
  align-items: center;
  clear: both;
  display: flex;
  font-size: 1.2rem;
  justify-content: space-around;
  overflow: hidden;
  padding: 3rem 1.5rem;
  position: relative;
`

const Image = styled.img`
  flex: 0 1 ${image_size};
  margin-left: 10%;
  max-width: ${image_size};
`

const P = styled.p`
  background-color: white;
  border-radius: 4px;
  border: 2px solid black;
  flex: 0 1 20em;
  padding: 0.75rem;
`

export default Step;
