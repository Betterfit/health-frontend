import FatToggle from "Components/Forms/FatToggle";
import LabelledSlider from "Components/Forms/LabelledSlider";
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
  const [tab, setTab] = useState<Tab>("Restrictions");
  const updateInterval = useRef<any>(null);

  // Since a lot of the options are sliders, we would generate an excessive amount of requests to our
  // server if we sent a new request every time the options changed.
  // Instead what we do is keep a local set of options and only update the real options (which trigger requests when changed )
  // after a small time delay.
  const localSetter = (optionName: keyof VaccineChartOptions) => (
    val: typeof options[keyof VaccineChartOptions]
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
      <div className="flex flex-row justify-around text-flow-white w-full mb-4">
        {(["Restrictions", "Vaccine Mix"] as Tab[]).map((tabName) => (
          <button
            onClick={(e) => setTab(tabName)}
            // underline if selected
            className={`rounded-sm p-1 mx-2 text-lg border-b-2 ${
              tabName === tab
                ? "border-flow-pale font-bold text-xl"
                : "border-transparent"
            }`}
          >
            {tabName}
          </button>
        ))}
      </div>
      <div className="text-flow-white pr-2">
        {tab === "Vaccine Mix" ? (
          <VaccineTypePicker
            vaccineUsage={localOptions.vaccineUsage}
            lockedVaccines={localOptions.lockedVaccines}
            setVaccineUsage={localSetter("vaccineUsage")}
            setLockedVaccines={localSetter("lockedVaccines")}
          />
        ) : (
          <>
            <LabelledSlider
              value={localOptions.restaurantCapacity}
              onChange={localSetter("restaurantCapacity")}
              label="Restaurant Capacity"
            />
            <LabelledSlider
              value={localOptions.gymCapacity}
              onChange={localSetter("gymCapacity")}
              label="Gym Capacity"
            />
            <LabelledSlider
              value={localOptions.retailCapacity}
              onChange={localSetter("retailCapacity")}
              label="Retail Capacity"
            />
            <LabelledSlider
              value={localOptions.essentialRetailCapacity}
              onChange={localSetter("essentialRetailCapacity")}
              label="Essential Retail Capacity"
            />
            <LabelledSlider
              value={localOptions.worshipCapacity}
              onChange={localSetter("worshipCapacity")}
              label="Places of Worship Capacity"
            />
            <div className="space-y-5">
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
          </>
        )}
      </div>
    </div>
  );
};

type Tab = "Restrictions" | "Vaccine Mix";
export default VaccineOptions;