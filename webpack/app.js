import React from "react"
import styled from "styled-components"

import { BrowserRouter, Route } from "react-router-dom"

import AboutPage from "./pages/about_page";
import BlockPage from "./pages/block_page";
import WelcomePage from "./pages/welcome_page";

const App = (props) => (
  <BrowserRouter>
    <div>
      <Route path="/about" component={AboutPage} />
      <Route path="/blocks/:id" component={BlockPage} />
      <Route exact path="/" component={WelcomePage} />
    </div>
  </BrowserRouter>
);

export default App;
