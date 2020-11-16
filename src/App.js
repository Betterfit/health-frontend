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

// ================ PAGES ================
import Login from './Pages/Login/Login';
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
              <Redirect to="/dashboard"/>
            )}/>

            {!token && (
              <Route path="/login" initial >
                <Login />
              </Route>
            )}
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
              <Dashboard language={authStore.language}/>
            </Route>
          </Switch>
        </div>
      </Router>
  );
})

export default App;
