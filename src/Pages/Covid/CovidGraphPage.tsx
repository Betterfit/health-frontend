import { Auth } from "aws-amplify";
import DashboardGraph from "Containers/Traffic/Inner/DashboardGraph";
import CognitoLogin from "Pages/Login/CognitoLogin";
import LoginContainer from "Pages/Login/LoginContainer";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import FlowNav from "./FlowNav";

export const CovidGraphPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [allowAccess, setAllowAccess] = useState(false);
  const { path } = useRouteMatch();

  const checkIfAuthenticated = useCallback(async () => {
    const session = await Auth.currentSession();
    if (session.isValid()) setIsAuthenticated(true);
  }, []);

  // layoutEffect so that the login screen isn't shown if we're already authenticated
  useLayoutEffect(() => {
    checkIfAuthenticated();
  }, [checkIfAuthenticated]);

  if (!isAuthenticated && !allowAccess)
    return (
      <LoginContainer>
        <p className="text-center pb-8 text-2xl">COVID-19 Data Aggregator</p>
        <CognitoLogin
          onAuthenticate={checkIfAuthenticated}
          signUpEnabled={false}
          continueWithoutPassword={() => setAllowAccess(true)}
        />
      </LoginContainer>
    );

  return (
    <div className="w-full flex-col flow-root">
      <FlowNav />
      <Switch>
        <Route exact path={`${path}`}>
          <Redirect to={`${path}/timeseries`} />
        </Route>
        <Route path={`${path}/vaccine`}>
          <DashboardGraph whichChart="vaccine" {...{ isAuthenticated }} />
        </Route>
        <Route path={`${path}/timeseries`}>
          <DashboardGraph whichChart="timeseries" {...{ isAuthenticated }} />
        </Route>
        <Route path={`${path}/ranking`}>
          <DashboardGraph whichChart="ranking" {...{ isAuthenticated }} />
        </Route>
      </Switch>
    </div>
  );
};
