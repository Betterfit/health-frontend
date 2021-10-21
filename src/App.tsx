import DashboardResearch from "Containers/DashboardResearch";
import DynamicDashboard from "Dashboard/DynamicDashboard";
import { setUpCognito } from "Helpers/cognito";
import { useMyProfile } from "Models/user";
import { CovidGraphPage } from "Pages/Covid/CovidGraphPage";
import SignUp from "Pages/Login/SignUp";
import React, { useEffect } from "react";
// components
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { preferencesActions } from "Store/preferencesSlice";
import { useAppDispatch, useAppSelector } from "Store/store";
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
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.preferences.loggedIn);
  const profileQuery = useMyProfile();

  // this is what handles logging in users automatically if they are authenticated with amplify Auth
  useEffect(() => {
    if (profileQuery.isSuccess) dispatch(preferencesActions.setLoggedIn(true));
  }, [profileQuery.isSuccess, dispatch]);
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* publically accessible page, no login required */}
          <Route path="/research">
            <DashboardResearch />
          </Route>
          {/* has own authentication*/}
          <Route path="/covid">
            <CovidGraphPage />
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
          <Route path="/login" initial>
            <LoginContainer>
              <Login />
            </LoginContainer>
          </Route>
          {!loggedIn && profileQuery.isError && <Redirect to="/login" />}
          <Route path="/dashboard">
            <DynamicDashboard />
          </Route>
          <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
          <Route path="/forgotpassword" initial>
            <LoginContainer>
              <ForgotPassword />
            </LoginContainer>
          </Route>
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
