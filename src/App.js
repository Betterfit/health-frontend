import React, {useContext} from 'react';
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
import DashboardSupplier from './Pages/Dashboards/DashboardSupplier';
import DashboardFacility from './Pages/Dashboards/DashboardFacility';

function App() {
  const token = localStorage.getItem('token');
  const {userData,addUserData} = useContext(UserAuthContext);
  // const type = "facility";
  let type = localStorage.getItem('user');
  if(type){
    type = JSON.parse(type);
  }
  console.log(type.user_profile.user_type);
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
              {type.user_profile.user_type === "facility_admin" && (
                <DashboardFacility/>
              )}
              {type.user_profile.user_type === "supplier_admin" && (
                <DashboardSupplier/>
              )}
            </Route>

          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
