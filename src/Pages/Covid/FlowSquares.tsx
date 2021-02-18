import React from "react";

type optionsSquareTypes = "quarters";
interface FlowSquaresProps {
  chart: React.ReactNode;
  options: React.ReactNode;
  optionsSquareType?: string;
}
const FlowSquares = ({
  chart,
  options,
  optionsSquareType = "quarters",
}: FlowSquaresProps) => {
  const optionsClass = optionsSquareClasses[optionsSquareType];
  return (
    <div className="flow-squares-root">
      <div className="chart-square">{chart}</div>
      <div className={optionsClass}>{options}</div>
    </div>
  );
};

const optionsSquareClasses: { [key: string]: string } = {
  quarters: "options-square",
};

export default FlowSquares;
