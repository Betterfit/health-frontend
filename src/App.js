import React, { useContext, useState, useEffect } from "react";
import logo from "./logo.svg";
// components
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

// ================ PAGES ================
import Login from "./Pages/Login/Login";
import ForgotPassword from "./Pages/Login/ForgotPassword";
import ResetPassword from "./Pages/Login/ResetPassword";
import LoginContainer from "./Pages/Login/LoginContainer";
import LogOut from "./Pages/Logout";
import Dashboard from "./Pages/Dashboard";
import { useAuthStore } from "Context/authContext";
import { observer } from "mobx-react";
import NotFound from "./Pages/404";
import DashboardResearch from "Containers/DashboardResearch";
import { CovidGraphPage } from "Pages/CovidGraphPage";
const App = observer(({ userType }) => {
  const authStore = useAuthStore();
  const token = authStore.token;
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* publically accessible page, no login required */}
          <Route path="/research">
            <DashboardResearch />
          </Route>
          <Route path="/covid">
            <CovidGraphPage />
          </Route>
          {/* everything below here requires login*/}
          <Route
            exact
            path="/"
            render={() =>
              token ? <Redirect to="/dashboard" /> : <Redirect to="/login" />
            }
          />
          <Route path="/login/forgotpassword" initial>
            <LoginContainer>
              <ForgotPassword></ForgotPassword>
            </LoginContainer>
          </Route>
          <Route path="/resetpassword" initial>
            <LoginContainer>
              <ResetPassword></ResetPassword>
            </LoginContainer>
          </Route>
          <Route path="/login" initial>
            <LoginContainer>
              <Login></Login>
            </LoginContainer>
          </Route>
          <Route path="/logout" initial>
            <LogOut />
          </Route>
          {!token && <Redirect to="/login" />}
          <Route path="/dashboard">
            <Dashboard language={authStore.language} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
          <Route path="/404" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
});

export default App;
