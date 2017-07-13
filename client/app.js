import React from "react"
import styled from "styled-components"

import ApolloClient, { createNetworkInterface } from "apollo-client"
import { ApolloProvider } from "react-apollo"
import { BrowserRouter, Route } from "react-router-dom"
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import AboutPage from "./pages/about_page";
import BlockPage from "./pages/block_page";
import WelcomePage from "./pages/welcome_page";

import Header from "components/header";

const App = (props) => {
  return (
    <ApolloProvider store={store} client={client}>
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

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: "/api",
    opts: {
      credentials: 'same-origin',
    },
  }),
})

const reducer = (state, action) => {
  if(action.type == "CHANGE_INPUT_JSON")
    return { input_json: action.input_json }

  return { input_json: null }
}

const store = createStore(
  combineReducers({
    app: reducer,
    apollo: client.reducer(),
  }),

  compose(
    applyMiddleware(client.middleware()),
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
)

export default App;
