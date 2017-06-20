import React from "react"
import styled from "styled-components"

import Hero from "./hero"
import Context from "./context"
import Step from "./step"

import facebook_opaque from "images/about/facebook_opaque.png"
import facebook_transparent from "images/about/facebook_transparent.png"
import building_blocks from "images/about/building_blocks.png"
import photo_sharing from "images/about/photo_sharing.png"
import order_lunch from "images/about/order_lunch.png"

const AboutPage = (props) => (
  <div>
    <Hero/>
    <Context scrollHint/>

    <Step image={facebook_opaque}>
      Most of us see apps as a single entity that we can interact with.
    </Step>

    <Step image={facebook_transparent}>
      But behind the scenes, apps are powered by small programs
      that talk to each other.
    </Step>

    <Step image={building_blocks}>
      Assemble
      packages these programs into building blocks
      that anyone can use.
    </Step>

    <Step image={photo_sharing}>
      So Jasmine, an event photographer,
      can create an app to share photos with her customers.
    </Step>

    <Step image={order_lunch}>
      Or Muhammed, an office manager,
      can build an app to help his coworkers
      decide what to order for lunch.
    </Step>

    <Context/>
  </div>
);

export default AboutPage;
