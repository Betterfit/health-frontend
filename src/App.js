import React, {useContext} from 'react';
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
import {UserAuthContext} from 'Context/UserAuth'

// ================ PAGES ================
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
function App() {
  const token = localStorage.getItem('token');
  const {userData,addUserData} = useContext(UserAuthContext);
  return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" render={() => (
              token ? (
                <Redirect to="/dashboard/inventory"/>
              ) : (
                <Redirect to="/login/"/>
              )
            )}/>
            <Route path="/login" initial exact>
              <Login />
            </Route>
            <Route path="/dashboard/">
              
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
