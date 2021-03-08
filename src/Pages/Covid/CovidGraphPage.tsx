import { Auth } from "aws-amplify";
import DashboardGraph from "Containers/Traffic/Inner/DashboardGraph";
import React, { useLayoutEffect, useState } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import CovidLogin from "./CovidLogin";
import FlowNav from "./FlowNav";


export const CovidGraphPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { path } = useRouteMatch();

  const checkIfAuthenticated = async () => {
    const session = await Auth.currentSession();
    if (session.isValid()) setIsAuthenticated(true);
  };

  // layoutEffect so that the login screen isn't shown if we're already authenticated
  useLayoutEffect(() => {
    checkIfAuthenticated();
  }, [checkIfAuthenticated]);

  if (!isAuthenticated)
    return <CovidLogin onAuthenticate={checkIfAuthenticated} />;

  return (
    <div className="w-full flex flex-col flow-root">
      <FlowNav />
      <Switch>
        <Route exact path={`${path}`}>
          <Redirect to={`${path}/timeseries`}/>
        </Route>
        <Route path={`${path}/vaccine`}>
          <DashboardGraph whichChart="vaccine" />
        </Route>
        <Route path={`${path}/timeseries`}>
          <DashboardGraph whichChart="timeseries" />
        </Route>
      </Switch>
    </div>
  );
};
