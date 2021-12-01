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

      <div className="col-start-2 col-end-13 row-start-7 space-x-8 py-2 md:p-0">
        <ChartLink relPath="timeseries" text="Time Series" />
        <ChartLink relPath="vaccine" text="Vaccine" />
        <ChartLink relPath="ranking" text="Ranking" />
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
      className={`text-sm md:text-lg lg:text-xl text-flow-white border-b-2 ${emphasize ? "border-flow-bfblue" : "border-transparent"
        }`}
    >
      {text}
    </Link>
  );
};

export default FlowNav;
