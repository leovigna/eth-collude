import React, { Component } from "react"
import { HashRouter, Route, Switch } from "react-router-dom"

//import { Drizzle } from "@drizzle/store"
import { DrizzleContext, drizzleReactHooks } from "@drizzle/react-plugin"

import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import drizzle from "./store"

import Home from "./components/Home"

// Containers
//const Home = React.lazy(() => import("./components/Home"))


const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
)

class App extends Component {
  render() {
    return (
      <drizzleReactHooks.DrizzleProvider drizzle={drizzle}>
          <drizzleReactHooks.Initializer
            error="There was an error."
            loadingContractsAndAccounts="Also still loading."
            loadingWeb3="Still loading.">
        <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route
                path="/"
                name="Home"
                render={props => <Home {...props} />}
              />
            </Switch>
          </React.Suspense>
        </HashRouter>
        </drizzleReactHooks.Initializer>
      </drizzleReactHooks.DrizzleProvider>
    )
  }
}

export default App
