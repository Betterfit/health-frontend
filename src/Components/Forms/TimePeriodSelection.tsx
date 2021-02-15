import React from "react";

interface TimePeriodSelectionBoxProps {
  daysBack: number;
  setDaysBack: (newVal: number) => void;
  size?: Size;
}
const TimePeriodSelection = ({
  daysBack,
  setDaysBack,
  size = "sm",
}: TimePeriodSelectionBoxProps) => {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setDaysBack(parseInt(e.target.value));

  const timePeriodOptions = [
    { value: 7, label: "Past Week" },
    { value: 14, label: "Past 2 Weeks" },
    { value: 30, label: "Past Month" },
    { value: 90, label: "Past 3 Months" },
  ];

  return (
    <select
      id="time period selection"
      name="time period"
      onChange={onChange}
      className={`uppercase tracking-extra-wide bg-transparent text-flow-white text-${size}`}
      value={daysBack}
    >
      {timePeriodOptions.map((option, i) => (
        <option key={i} value={option.value} className={`text-flow-white text-${size} bg-flow-navy`}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default TimePeriodSelection;

type Size = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
