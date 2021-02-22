import FatToggle from "Components/Forms/FatToggle";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useRef, useState } from "react";
import { VaccineChartOptions } from "Types";

interface VaccineOptionsProps {
  options: VaccineChartOptions;
  setOptions: (options: VaccineChartOptions) => void;
}

const VaccineOptions = ({ options, setOptions }: VaccineOptionsProps) => {
  const [localOptions, setLocalOptions] = useState<VaccineChartOptions>(
    options
  );
  const updateInterval = useRef<any>(null)
  const localSetter = (optionName: keyof VaccineChartOptions) => (val: number | boolean) => {
    const newOptions = {...options, [optionName]: val}
    setLocalOptions(newOptions);
    if (updateInterval.current){
      clearInterval(updateInterval.current)
      updateInterval.current = null;
    }
    updateInterval.current = setInterval(() => setOptions(newOptions), 300) 
  }

  return (
    <div style={{ gridRow: "1 / -1" }}>
      <div className="text-flow-white pr-2">
        <CapSlider
          value={localOptions.restaurantCapacity}
          onChange={localSetter("restaurantCapacity")}
          label="Restaurant Capacity"
        />
        <CapSlider
          value={localOptions.gymCapacity}
          onChange={localSetter("gymCapacity")}
          label="Gym Capacity"
        />
        <CapSlider
          value={localOptions.retailCapacity}
          onChange={localSetter("retailCapacity")}
          label="Retail Capacity"
        />
        <CapSlider
          value={localOptions.essentialRetailCapacity}
          onChange={localSetter("essentialRetailCapacity")}
          label="Essential Retail Capacity"
        />
        <CapSlider
          value={localOptions.worshipCapacity}
          onChange={localSetter("worshipCapacity")}
          label="Places of Worship Capacity"
        />
      </div>

      <div className="mt-6 space-y-5">
        <FatToggle
          checked={localOptions.masksMandatory}
          setChecked={localSetter("masksMandatory")}
          label="Masks Mandatory?"
        />
        <FatToggle
          checked={localOptions.schoolsOpen}
          setChecked={localSetter("schoolsOpen")}
          label="Schools Open?"
        />
        <FatToggle
          checked={localOptions.curfew}
          setChecked={localSetter("curfew")}
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
