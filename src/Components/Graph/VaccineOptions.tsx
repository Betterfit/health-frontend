import FatToggle from "Components/Forms/FatToggle";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React from "react";
import { VaccineChartOptions } from "Types";

interface VaccineOptionsProps {
  options: VaccineChartOptions;
  setter: (propName: string) => (val: number | boolean) => void;
}

const VaccineOptions = ({ options, setter }: VaccineOptionsProps) => {
  // @ts-ignore
  const onToggle = (propName) => () => setter(propName)(!options[propName]);
  return (
    <>
      <div style={{ gridRow: "1 / 7" }} className="text-flow-white pr-2">
        <CapSlider
          value={options.restaurantCapacity}
          onChange={setter("restaurantCapacity")}
          label="Restaurant Capacity"
        />
        <CapSlider
          value={options.gymCapacity}
          onChange={setter("gymCapacity")}
          label="Gym Capacity"
        />
        <CapSlider
          value={options.retailCapacity}
          onChange={setter("retailCapacity")}
          label="Retail Capacity"
        />
        <CapSlider
          value={options.essentialRetailCapacity}
          onChange={setter("essentialRetailCapacity")}
          label="Essential Retail Capacity"
        />
        <CapSlider
          value={options.worshipCapacity}
          onChange={setter("worshipCapacity")}
          label="Places of Worship Capacity"
        />
      </div>

      <div className="mt-6 space-y-5" style={{ gridRow: "7 / 13" }}>
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
    </>
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
