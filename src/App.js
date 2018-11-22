import './app.sass'

import React from 'react'
import { Router, Link, Switch, Route } from 'react-static'
import Routes from 'react-static-routes'
import { hot } from 'react-hot-loader'

const App = () => (
  <Router>
    <React.Fragment>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes />
    </React.Fragment>
  </Router>
)

export default hot(module)(App)
