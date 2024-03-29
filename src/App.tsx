import { Auth } from "@aws-amplify/auth";
import DashboardResearch from "Containers/DashboardResearch";
import DynamicDashboard from "Dashboard/DynamicDashboard";
import { setUpCognito } from "Helpers/cognito";
import { useMyProfile } from "Models/user";
import React, { useEffect } from "react";
// components
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { CovidGraphPage } from "Routes/Covid/CovidGraphPage";
import SignUp from "Routes/Login/SignUp";
import PublicProductCatalog from "Routes/PublicProductCatalog";
import { preferencesActions } from "Store/preferencesSlice";
import { useAppDispatch, useAppSelector } from "Store/store";
import NotFound from "./Routes/404";
import ForgotPassword from "./Routes/Login/ForgotPassword";
// ================ PAGES ================
import Login from "./Routes/Login/HealthLogin";
import LoginContainer from "./Routes/Login/LoginContainer";
import LogOut from "./Routes/Logout";
import "./styles/globalClasses.module.css";
import "./styles/tailwind.css";

setUpCognito();
const App = () => {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.preferences.loggedIn);
  const profileQuery = useMyProfile({ enabled: true, staleTime: 0 });
  const location = useLocation();
  // if a user visits a page without being logged in, they will be redirected to
  // the login page with a ?redirect={path} query parameter.
  // Once they login, they will be redirected to this path.
  // However, we don't want users to ever be redirected back to the login page after logging in.
  const redirect = location.pathname.includes("login") ? "" : location.pathname;

  // this is what handles logging in users automatically if they are authenticated with amplify Auth
  useEffect(() => {
    if (profileQuery.isSuccess) dispatch(preferencesActions.setLoggedIn(true));
    if (profileQuery.isError) dispatch(preferencesActions.setLoggedIn(false));
  }, [profileQuery.isSuccess, profileQuery.isError, dispatch]);
  useEffect(() => {
    Auth.currentSession()
      .then(() => dispatch(preferencesActions.setLoggedIn(true)))
      .catch(() => dispatch(preferencesActions.setLoggedIn(false)));
  }, [dispatch]);
  return (
    <div className="App">
      <Switch>
        {/* publically accessible page, no login required */}
        <Route path="/research">
          <DashboardResearch />
        </Route>
        <Route path="/catalog">
          <PublicProductCatalog />
        </Route>
        {/* has own authentication*/}
        <Route path="/covid">
          <CovidGraphPage />
        </Route>
        <Route path="/logout" initial>
          <LoginContainer>
            <LogOut />
          </LoginContainer>
        </Route>
        <Route path="/forgotpassword" initial>
          <LoginContainer>
            <ForgotPassword />
          </LoginContainer>
        </Route>
        <Route path="/login" initial>
          <LoginContainer>
            <Login />
          </LoginContainer>
        </Route>
        <Route path="/signup" initial>
          <LoginContainer>
            <SignUp />
          </LoginContainer>
        </Route>
        {!loggedIn && <Redirect to={"/login?redirect=" + redirect} />}
        <Route path="/dashboard">
          <DynamicDashboard />
        </Route>
        <Route
          exact
          path="/"
          render={() =>
            loggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />
          }
        />
        <Route path="*">
          <NotFound />
        </Route>
        <Route path="/404" component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
