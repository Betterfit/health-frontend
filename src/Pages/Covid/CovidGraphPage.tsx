import DashboardGraph from "Containers/Traffic/Inner/DashboardGraph";
import React, { useState } from "react";
import CovidLogin from "./CovidLogin";

const fake_password =
  process.env.REACT_APP_GRAPH_PAGE_FAKE_PASSWORD || "canada";

const requirePassword = true;

export const CovidGraphPage = () => {
  const [authorized, setAuthorized] = useState(!requirePassword);

  let graphWidth = window.innerWidth * 0.5;
  if (window.innerWidth < 600) {
    graphWidth = window.innerWidth * 0.95;
  }
  const graphHeight = 0.8 * graphWidth;
  if (!authorized)
    return (
        <CovidLogin />
    );

  return (
    <div className="w-full flex flex-col items-center">
      <CovidLogin />
      <h1 className="self-center text-2xl text-dark-blue py-3">
        BetterFit COVID-19 Aggregator
      </h1>
      <DashboardGraph width={graphWidth} height={graphHeight} />
    </div>
  );
};
