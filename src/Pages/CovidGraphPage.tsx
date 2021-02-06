import Button from "Components/Forms/Button";
import InputField from "Components/Forms/InputField";
import DashboardGraph from "Containers/Traffic/Inner/DashboardGraph";
import Logo from "Images/logo.svg";
import React, { useState } from "react";
import { ReactSVG } from "react-svg";

const fake_password =
  process.env.REACT_APP_GRAPH_PAGE_FAKE_PASSWORD || "canada";

const requirePassword =
  process.env.REACT_APP_GRAPH_PAGE_REQUIRE_PASSWORD === "true";

export const CovidGraphPage = () => {
  const [authorized, setAuthorized] = useState(!requirePassword);

  let graphWidth = Math.min(window.innerWidth * 0.5, 1024);
  if (window.innerWidth < 500) {
    graphWidth = window.innerWidth * 0.95;
  }
  const graphHeight = 0.8 * graphWidth;

  if (!authorized) return <FakeLogin authorize={() => setAuthorized(true)} />;

  return (
    <div className="flex flex-col m-auto items-center max-w-screen-xl">
      <div className="flex items-end py-2 w-full justify-between">
        <a
          href="https://betterfit.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ReactSVG
            src={Logo}
            className="px-2"
            beforeInjection={(svg) => {
              svg.setAttribute("style", "margin:auto;");
            }}
            alt="Betterfit"
          />
        </a>
        <h1 className="text-2xl text-dark-blue">COVID-19 Aggregator</h1>
        {/* invisible, used to get logo left aligned and title centered */}
        <div className="px-20 py-1" />
      </div>
      <DashboardGraph width={graphWidth} height={graphHeight} />
    </div>
  );
};

interface FakeLoginProps {
  authorize: () => void;
}
const FakeLogin = ({ authorize }: FakeLoginProps) => {
  const [password, setPassword] = useState("");

  const attemptLogin = () => {
    if (password === fake_password) authorize();
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <p className="py-5 ">Welcome to BetterFit's COVID-19 Data Aggregator</p>
      <form className="pb-12">
        <InputField
          idTag="password"
          name="Password"
          type="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <div className="my-5 w-7">
          <Button text="Enter" onClick={attemptLogin} solid={true} />
        </div>
      </form>
    </div>
  );
};
