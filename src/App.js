import React, {useContext, useState,useEffect} from 'react';
import logo from './logo.svg';
// components
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import store from 'Store/store.js';

// ================ PAGES ================
import Login from './Pages/Login/Login';
import ForgotPassword from './Pages/Login/ForgotPassword';
import ResetPassword from './Pages/Login/ResetPassword';
import LoginContainer from './Pages/Login/LoginContainer';
import LogOut from './Pages/Logout';
import Dashboard from './Pages/Dashboard';
import {useAuthStore} from "Context/authContext";
import { observer } from "mobx-react"
const App = observer(({userType}) => {
  const authStore = useAuthStore();
  const token = authStore.token;
  return (
      <Router>
        <div className="App">
          <Switch>

            <Route exact path="/" render={() => (
              token ? (
                <Redirect to="/dashboard"/>
              ) : (
                <Redirect to="/login/"/>
              )
            )}/>
            <Route path="/login/forgotpassword" initial >
             <LoginContainer> 
                <ForgotPassword></ForgotPassword>
              </LoginContainer>
            </Route>
            <Route path="/resetpassword" initial >
             <LoginContainer> 
                <ResetPassword></ResetPassword>
              </LoginContainer>
            </Route>
            <Route path="/login" initial >
              <LoginContainer> 
                <Login></Login>
              </LoginContainer>
            </Route>
            <Route path="/logout" initial >
              <LogOut />
            </Route>

            <Route path="/dashboard">
              <Dashboard language={authStore.language}/>
            </Route>
          </Switch>
        </div>
      </Router>
  );
})

export default App;
