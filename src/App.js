import Amplify from "aws-amplify";
import DashboardResearch from "Containers/DashboardResearch";
import { useAuthStore } from "Context/authContext";
import { observer } from "mobx-react";
import { CovidGraphPage } from "Pages/Covid/CovidGraphPage";
import React from "react";
// components
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import NotFound from "./Pages/404";
import Dashboard from "./Pages/Dashboard";
import ForgotPassword from "./Pages/Login/ForgotPassword";
// ================ PAGES ================
import Login from "./Pages/Login/HealthLogin";
import LoginContainer from "./Pages/Login/LoginContainer";
import ResetPassword from "./Pages/Login/ResetPassword";
import LogOut from "./Pages/Logout";

const cognitoConfig = {
  region: process.env.REACT_APP_COGNITO_REGION,
  userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  clientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
};

Amplify.configure({
  Auth: {
    region: cognitoConfig.region,
    userPoolId: cognitoConfig.userPoolId,
    userPoolWebClientId: cognitoConfig.clientId,
  },
});

const App = observer(() => {
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
          <LoginContainer>
            <Route path="/login/forgotpassword" initial>
              <ForgotPassword />
            </Route>
            <Route path="/resetpassword" initial>
              <ResetPassword />
            </Route>
            <Route path="/login" initial exact>
              <Login />
            </Route>
          </LoginContainer>
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
