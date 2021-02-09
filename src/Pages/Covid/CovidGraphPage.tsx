import { Auth } from "aws-amplify";
import DashboardGraph from "Containers/Traffic/Inner/DashboardGraph";
import React, { useEffect, useState } from "react";
import CovidLogin from "./CovidLogin";

export const CovidGraphPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const checkIfAuthenticated = async () => {
    const session = await Auth.currentSession();
    if (session.isValid()) setIsAuthenticated(true);
  };
  useEffect(() => {
    checkIfAuthenticated();
  }, [checkIfAuthenticated]);


  let graphWidth = window.innerWidth * 0.5;
  if (window.innerWidth < 600) {
    graphWidth = window.innerWidth * 0.95;
  }
  const graphHeight = 0.8 * graphWidth;
  if (!isAuthenticated)
    return (
      <CovidLogin
        onAuthenticate={checkIfAuthenticated}
      />
    );

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="self-center text-2xl text-dark-blue py-3">
        BetterFit COVID-19 Aggregator
      </h1>
      <DashboardGraph width={graphWidth} height={graphHeight} />
    </div>
  );
};
