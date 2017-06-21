import React from "react"
import styled from "styled-components"

import { BrowserRouter, Route } from "react-router-dom"
import { ApolloProvider } from "react-apollo"
import ApolloClient, { createNetworkInterface } from "apollo-client"

import AboutPage from "./pages/about_page";
import BlockPage from "./pages/block_page";
import WelcomePage from "./pages/welcome_page";

import Header from "components/header";

const App = (props) => {
  const client = new ApolloClient({
    networkInterface: createNetworkInterface({
      uri: "/api",
      opts: {
        credentials: 'same-origin',
      },
    }),
  })

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div>
          <Header/>

          <Route path="/about" component={AboutPage} />
          <Route path="/blocks/:id" component={BlockPage} />
          <Route exact path="/" component={WelcomePage} />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  )
};

export default App;
