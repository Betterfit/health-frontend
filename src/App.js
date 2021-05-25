import DashboardResearch from "Containers/DashboardResearch";
import { useAuthStore } from "Context/authContext";
import { setUpCognito } from "Helpers/cognito";
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
setUpCognito();
const App = observer(() => {
  const authStore = useAuthStore();
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
            <Dashboard language={authStore.language} />
          </Route>
          <Route
            exact
            path="/"
            render={() =>
              authStore.user ? (
                <Redirect to="/dashboard" />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route path="/forgotpassword" initial>
            <LoginContainer>
              <ForgotPassword />
            </LoginContainer>
          </Route>
          <Route path="/resetpassword" initial>
            <LoginContainer>
              <ResetPassword />
            </LoginContainer>
          </Route>
          <Route path="/login" initial exact>
            <LoginContainer>
              <Login />
            </LoginContainer>
          </Route>
          <Route path="/logout" initial>
            <LoginContainer>
              <LogOut />
            </LoginContainer>
          </Route>
          {!authStore.user && <Redirect to="/login" />}
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
