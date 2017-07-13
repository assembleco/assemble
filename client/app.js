import React from "react"
import styled from "styled-components"

import ApolloClient, { createNetworkInterface } from "apollo-client"
import thunkMiddleware from "redux-thunk";
import { ApolloProvider } from "react-apollo"
import { BrowserRouter, Route } from "react-router-dom"
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import AboutPage from "./pages/about_page";
import BlockPage from "./pages/block_page";
import WelcomePage from "./pages/welcome_page";

import Header from "components/header";

import reducers from "reducers"

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

const store = createStore(
  combineReducers({
    app: reducers.rootReducer,
    apollo: client.reducer(),
  }),

  compose(
    applyMiddleware(client.middleware()),
    applyMiddleware(thunkMiddleware),
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
)

export default App;
