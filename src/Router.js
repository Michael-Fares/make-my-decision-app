import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import cookie from 'cookie'

import SignUp from './components/SignUp'
import Login from './components/Login'
import About from './components/About'
import ListDecisions from './components/ListDecisions'
import AddDecision from './components/AddDecision'
import ListCriteria from './components/ListCriteria'
import AddCriteria from './components/AddCriteria'
import ListOptions from './components/ListOptions'
import AddOption from './components/AddOption'
import Rankings from './components/Rankings'
import EndScreen from './components/EndScreen'



// Write checkAuth function here
// Check the cookies for a cookie called "loggedIn"

export const checkAuth = () => {
    const cookies = cookie.parse(document.cookie)
    console.log(cookies["loggedIn"])
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



const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            {/* Protect this route */}
            <Route path="/decisions" component={ListDecisions} />
            <Route path="/add-decision" component={AddDecision} />
            <Route path="/add-criteria/for-decision/:id" component={AddCriteria} />
            <Route path="/list-criteria/for-decision/:id" component={ListCriteria} />
            <Route path="/list-options/for-decision/:id" component={ListOptions} />
            <Route path="/add-option/for-decision/:id" component={AddOption} />
            <Route path="/rankings/for-decision/:id" component={Rankings} />
            <Route path="/results/for-decision/:id" component={EndScreen} />
        </Switch>
    );
};

export default Router;