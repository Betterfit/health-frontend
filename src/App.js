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
import {UserAuthContext} from 'Context/UserAuth'

import { Provider } from 'mobx-react';
import store from 'Store/store.js';

// ================ PAGES ================
import Login from './Pages/Login/Login';
import LogOut from './Pages/Logout';
import Dashboard from './Pages/Dashboard';

function App({userType}) {
  const token = store.authStore.token;
  const {userData,addUserData} = useContext(UserAuthContext);
  return (
    <Provider store={store}>
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

            <Route path="/login" initial >
              <Login />
            </Route>
            <Route path="/logout" initial >
              <LogOut />
            </Route>
            <Route path="/login/forgotpassword" initial >
              <Login />
            </Route>
            <Route path="/dashboard">
              <Dashboard/>
            </Route>

          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
