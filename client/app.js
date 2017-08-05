import React from "react"
import styled from "styled-components"

import ApolloClient, { createNetworkInterface } from "apollo-client"
import thunkMiddleware from "redux-thunk";
import { ApolloProvider } from "react-apollo"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import AboutPage from "./pages/about";
import BlockPage from "./pages/block";
import WelcomePage from "./pages/welcome";
import NotFoundPage from "./pages/not_found";

import Header from "components/header";

import reducers from "reducers"

const App = (props) => {
  return (
    <ApolloProvider store={store} client={client}>
      <BrowserRouter>
        <div>
          <Header/>

          <Switch>
            <Route path="/about" component={AboutPage} />
            <Route path="/blocks/:id" component={BlockPage} />
            <Route exact path="/" component={WelcomePage} />
            <Route component={NotFoundPage} />
          </Switch>
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
    app: reducers.appReducer,
    apollo: client.reducer(),
  }),

  compose(
    applyMiddleware(client.middleware()),
    applyMiddleware(thunkMiddleware),
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
)

export default App;
