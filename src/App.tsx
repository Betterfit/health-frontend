import DashboardResearch from "Containers/DashboardResearch";
import DynamicDashboard from "Dashboard/DynamicDashboard";
import { setUpCognito } from "Helpers/cognito";
import { useMyProfile } from "Models/user";
import { CovidGraphPage } from "Pages/Covid/CovidGraphPage";
import SignUp from "Pages/Login/SignUp";
import React from "react";
// components
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import NotFound from "./Pages/404";
import ForgotPassword from "./Pages/Login/ForgotPassword";
// ================ PAGES ================
import Login from "./Pages/Login/HealthLogin";
import LoginContainer from "./Pages/Login/LoginContainer";
import LogOut from "./Pages/Logout";
import "./styles/globalClasses.module.css";
import "./styles/tailwind.css";

setUpCognito();
const App = () => {
  const { signedIn } = useMyProfile();
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
          <Route path="/dashboard">
            <DynamicDashboard />
          </Route>
          <Route
            exact
            path="/"
            render={() =>
              signedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />
            }
          />
          <Route path="/forgotpassword" initial>
            <LoginContainer>
              <ForgotPassword />
            </LoginContainer>
          </Route>
          <Route path="/login" initial exact>
            <LoginContainer>
              <Login />
            </LoginContainer>
          </Route>
          <Route path="/signup" initial exact>
            <LoginContainer>
              <SignUp />
            </LoginContainer>
          </Route>
          <Route path="/logout" initial>
            <LoginContainer>
              <LogOut />
            </LoginContainer>
          </Route>
          {!signedIn && <Redirect to="/login" />}
          <Route path="*">
            <NotFound />
          </Route>
          <Route path="/404" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;