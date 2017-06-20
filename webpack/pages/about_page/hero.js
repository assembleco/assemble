import React from "react"
import styled from "styled-components"

import hero_image from "images/about/hero_background.png"
import title_image from "images/about/title.png"

const Hero = () => (
  <Wrapper>
    <Left>
      <p>Welcome, beautiful human, to</p>
      <img src={title_image} alt="Assemble"/>
    </Left>

    <Right>
      <p>
        We want to make it easy for anyone to access the power of technology –
        whether they know how to code or not.
      </p>

      <p>
        We're working to create simple, understandable tools
        to bring the best parts of programming to everyone in the world.
      </p>
    </Right>
  </Wrapper>
);

const Wrapper = styled.div`
  align-items: center;
  background-image: url(${hero_image});
  background-size: cover;
  display: flex;
  font-size: 1.2rem;
  min-height: 60vh;
  justify-content: space-around;
  overflow: hidden;
  padding: 1.5rem;
`

const Left = styled.div`
  flex: 0 1 40%;
  font-weight: bold;
`

const Right = styled.div`
  background-color: white;
  border-radius: 4px;
  border: 2px solid black;
  flex: 0 1 20em;
  padding: 0.75rem;
`

export default Hero;
