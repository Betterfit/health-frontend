import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";

const FlowNav = () => {
  return (
    <nav className="flow-nav">
      <div className="site-logo">
        <img src="/bf-square-logo.svg" alt="betterfit" />
      </div>
      <div className="flow-logo">
        <img src="/flow-logo.png" alt="flow" />
      </div>

      <div className="col-start-2 col-end-13 row-start-7 p-0 space-x-8">
        <ChartLink relPath="timeseries" text="Time Series" />
        <ChartLink relPath="vaccine" text="Vaccine" />
      </div>
    </nav>
  );
};

interface ChartLinkProps {
  relPath: string;
  text: string;
}
const ChartLink = ({ relPath, text }: ChartLinkProps) => {
  const location = useLocation();
  // emphasize link if we're currently on the corresponding page
  const emphasize = location.pathname === "/covid/" + relPath;
  return (
    <Link
      to={`/covid/${relPath}`}
      className={`text-xl text-flow-white border-b-2 ${
        emphasize ? "border-flow-bfblue" : "border-transparent"
      }`}
    >
      {text}
    </Link>
  );
};

export default FlowNav;
