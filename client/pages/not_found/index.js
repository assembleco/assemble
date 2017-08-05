import React from "react"
import styled from "styled-components"

import { Page } from "hedron"
import { Link } from "react-router-dom"

const NotFoundPage = () => (
  <Page width="1200px">
    <h1>Uh oh.</h1>

    <p>
      We can't find the page you're looking for.
    </p>

    <Link to="/">
      Get back on track.
    </Link>
  </Page>
)

export default NotFoundPage
