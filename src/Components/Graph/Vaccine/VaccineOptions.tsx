import FatToggle from "Components/Forms/FatToggle";
import React, { useRef, useState } from "react";
import { VaccineChartOptions } from "Types";
import VaccineTypePicker from "./VaccineTypePicker";

interface VaccineOptionsProps {
  options: VaccineChartOptions;
  setOptions: (options: VaccineChartOptions) => void;
}

const VaccineOptions = ({ options, setOptions }: VaccineOptionsProps) => {
  const [localOptions, setLocalOptions] = useState<VaccineChartOptions>(
    options
  );
  const updateInterval = useRef<any>(null);
  const localSetter = (optionName: keyof VaccineChartOptions) => (
    val: number | boolean
  ) => {
    const newOptions = { ...localOptions, [optionName]: val };
    setLocalOptions(newOptions);
    if (updateInterval.current) {
      clearTimeout(updateInterval.current);
      updateInterval.current = null;
    }
    updateInterval.current = setTimeout(() => setOptions(newOptions), 300);
    return () => clearTimeout(updateInterval.current);
  };

  return (
    <div style={{ gridRow: "1 / -1" }}>
      <div className="text-flow-white pr-2">
        <VaccineTypePicker setEfficacy={localSetter("efficacy")} />
        {/* <CapSlider
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
        /> */}
      </div>
      <div className="mt-6 space-y-5">
        <FatToggle
          checked={localOptions.masksMandatory}
          setChecked={localSetter("masksMandatory")}
          label="Masks Mandatory?"
        />
        <FatToggle
          checked={localOptions.elementarySchoolsOpen}
          setChecked={localSetter("elementarySchoolsOpen")}
          label="Primary Schools Open?"
        />
        <FatToggle
          checked={localOptions.secondarySchoolsOpen}
          setChecked={localSetter("secondarySchoolsOpen")}
          label="Secondary Schools Open?"
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

export default VaccineOptions;
