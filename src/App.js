import React from 'react';
import logo from './logo.svg';
// components
import Button from './Components/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


// ================ PAGES ================
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Cookies from 'js-cookie'
function App() {
  const loginCookie = Cookies.get('token');
  return (
      <Router>
        <div className="App">
          <Switch>
          <Route exact path="/" render={() => (
              loginCookie ? (
                <Redirect to="/dashboard/inventory"/>
              ) : (
                <Redirect to="/login"/>
              )
            )}/>
            <Route path="/login" initial exact>
              <Login />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
