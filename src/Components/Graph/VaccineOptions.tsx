import FatToggle from "Components/Forms/FatToggle";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useRef, useState } from "react";
import { VaccineChartOptions } from "Types";

interface VaccineOptionsProps {
  options: VaccineChartOptions;
  setter: (optionName: string) => (val: number | boolean) => void;
}

const VaccineOptions = ({ options, setter }: VaccineOptionsProps) => {
  // @ts-ignore
  const onToggle = (optionName) => () => setter(optionName)(!options[optionName]);

  // This component keeps a local copy of the options and only updates the real ones periodically after changes.
  // Otherwise, the slider produces dozens of updates for a single move, which spans the api with requests and
  // forces the chart to rerender repeatedly.
  const [localOptions, setLocalOptions] = useState<VaccineChartOptions>(
    options
  );

  const updateRealOptions = () => {
    const sliderOptions = Object.keys(localOptions).filter((key) =>
      key.endsWith("Capacity")
    ) as Array<keyof VaccineChartOptions>;
    sliderOptions.forEach((optionName) => setter(optionName)(localOptions[optionName]));
  };

  const searchTimeoutID = useRef<any>(null);
  const onSliderChange = (optionName: string) => (val: number) => {
    setLocalOptions({ ...localOptions, [optionName]: val });
    if (searchTimeoutID.current) clearTimeout(searchTimeoutID.current);
    searchTimeoutID.current = setTimeout(updateRealOptions, 100);
  };
  return (
    <div style={{ gridRow: "1 / -1" }}>
      <div className="text-flow-white pr-2">
        <CapSlider
          value={localOptions.restaurantCapacity}
          onChange={onSliderChange("restaurantCapacity")}
          label="Restaurant Capacity"
        />
        <CapSlider
          value={localOptions.gymCapacity}
          onChange={onSliderChange("gymCapacity")}
          label="Gym Capacity"
        />
        <CapSlider
          value={localOptions.retailCapacity}
          onChange={onSliderChange("retailCapacity")}
          label="Retail Capacity"
        />
        <CapSlider
          value={localOptions.essentialRetailCapacity}
          onChange={onSliderChange("essentialRetailCapacity")}
          label="Essential Retail Capacity"
        />
        <CapSlider
          value={localOptions.worshipCapacity}
          onChange={onSliderChange("worshipCapacity")}
          label="Places of Worship Capacity"
        />
      </div>

      <div className="mt-6 space-y-5">
        <FatToggle
          checked={options.masksMandatory}
          onToggle={onToggle("masksMandatory")}
          label="Masks Mandatory?"
        />
        <FatToggle
          checked={options.schoolsOpen}
          onToggle={onToggle("schoolsOpen")}
          label="Schools Open?"
        />
        <FatToggle
          checked={options.curfew}
          onToggle={onToggle("curfew")}
          label="Curfew?"
        />
      </div>
    </div>
  );
};

interface CapSliderProps {
  value: number;
  label: string;
  onChange: (val: number) => void;
  showMarks?: boolean;
}
const CapSlider = ({
  value,
  label,
  onChange,
  showMarks = false,
}: CapSliderProps) => (
  <div>
    <div className="flex justify-between">
      <label id="capSlider">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-12 ml-auto bg-transparent"
        max={100}
        min={0}
      />
    </div>
    <Slider
      value={value}
      onChange={onChange}
      marks={showMarks ? sliderMarks : undefined}
      className="mb-5 text-flow-white"
      ariaLabelledByForHandle="capSlider"
      handleStyle={{ borderColor: "#61C1BA", backgroundColor: " #61C1BA" }}
    />
  </div>
);

// sliderMarks looks like this
// {
//   75: {
//     style: {
//       color: "#B4EFEF",
//     },
//     label: "75%",
//   },
// };

const sliderMarks = [0, 50, 100].reduce<Record<number, any>>((acc, val) => {
  acc[val] = {
    style: { color: "#1F5C66" },
    label: `${val}%`,
  };
  return acc;
}, {});

export default VaccineOptions;
