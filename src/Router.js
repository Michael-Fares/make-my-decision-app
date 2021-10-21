import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import cookie from 'cookie'

import SignUp from './components/SignUp'
import Login from './components/Login'
import About from './components/About'
import ListDecisions from './components/ListDecisions'




// Write checkAuth function here
// Check the cookies for a cookie called "loggedIn"

export const checkAuth = () => {
    const cookies = cookie.parse(document.cookie)
    return cookies["loggedIn"] ? true : false
}

console.log("value of check auth function", checkAuth())

const ProtectedRoute = ({component: Component, ...rest}) => {
    // ... rest just signifies the rest of the attributes passed into the Route
    console.log("rest", rest)
    return (
      <Route
      {...rest}
      render={(props) => checkAuth()
          ? <Component {...props} />
          : <Redirect to="/login" />}
      />
    )
  }



const Router = (window) => {
    return (
        <Switch>
            <Route exact path="/" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            {/* Protect this route */}
            <Route path="/decisions" component={ListDecisions} />
            
        </Switch>
    );
};

export default Router;