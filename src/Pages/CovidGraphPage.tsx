import Button from "Components/Forms/Button";
import InputField from "Components/Forms/Input_Field";
import DashboardGraph from "Containers/Traffic/Inner/DashboardGraph";
import React, { useState } from "react";

const fake_password = "charlieTop674";

export const CovidGraphPage = () => {
  const [authorized, setAuthorized] = useState(true);
  const graphWidth = window.innerWidth * 0.9;
  const graphHeight = window.innerHeight * 0.6;

  if (!authorized) return <FakeLogin authorize={() => setAuthorized(false)} />;

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="self-center text-2xl text-dark-blue py-3">
        BetterFit COVID-19 Aggregator
      </h1>
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
          id_tag="password"
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
