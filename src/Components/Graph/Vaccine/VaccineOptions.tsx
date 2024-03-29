import Tippy from "@tippyjs/react";
import FatToggle from "Components/Forms/FatToggle";
import LabelledSlider from "Components/Forms/LabelledSlider";
import RestrainedSliders from "Components/Forms/RestrainedSliders";
import {
  computeVaccineEfficacy,
  vaccineLabels,
  variantLabels,
} from "Helpers/vaccineUtils";
import React, { useRef, useState } from "react";
import { VaccineChartOptions } from "Types";

interface VaccineOptionsProps {
  options: VaccineChartOptions;
  setOptions: (options: VaccineChartOptions) => void;
  isAuthenticated: boolean;
}

const VaccineOptions = ({
  options,
  setOptions,
  isAuthenticated,
}: VaccineOptionsProps) => {
  const [localOptions, setLocalOptions] = useState<VaccineChartOptions>(
    options
  );
  const [tab, setTab] = useState<Tab>("Vaccine Mix");
  const updateInterval = useRef<any>(null);

  // Since a lot of the options are sliders, we would generate an excessive amount of requests to our
  // server if we sent a new request every time the options changed.
  // Instead what we do is keep a local set of options and only update the real options (which trigger requests when changed )
  // after a small time delay.
  const localSetter = (optionName: keyof VaccineChartOptions) => (val: any) => {
    const newOptions = { ...localOptions, [optionName]: val };
    setLocalOptions(newOptions);
    if (updateInterval.current) {
      clearTimeout(updateInterval.current);
      updateInterval.current = null;
    }
    updateInterval.current = setTimeout(() => setOptions(newOptions), 300);
  };
  const vaccineOptionTabs = ["Vaccine Mix"] as Tab[];
  if (isAuthenticated) vaccineOptionTabs.push("Restrictions");
  return (
    <div
      className="flex flex-col overflow-y-scroll"
      style={{ gridRow: "1 / -1" }}
    >
      <div className="flex lg:self-end justify-around text-sm lg:text-md text-flow-white w-full mb-4">
        {vaccineOptionTabs.map((tabName) => (
          <button
            onClick={(e) => setTab(tabName)}
            // underline if selected
            className={`rounded-sm p-1 mx-1 text-md lg:text-md xl:text-lg border-b-2 ${
              tabName === tab
                ? "border-flow-pale font-bold"
                : "border-transparent"
            }`}
          >
            {tabName}
          </button>
        ))}
      </div>
      <div className="text-flow-white pr-2">
        {tab === "Vaccine Mix" ? (
          <>
            <p className="text-flow-white text-center my-3">
              {`Vaccine Efficacy: ${(
                computeVaccineEfficacy(
                  localOptions.vaccineUsage,
                  localOptions.variantPrevelance
                ) * 100
              ).toFixed(2)}%`}{" "}
            </p>
            <RestrainedSliders
              values={localOptions.vaccineUsage}
              lockedValues={localOptions.lockedVaccines}
              setValues={localSetter("vaccineUsage")}
              setLockedValues={localSetter("lockedVaccines")}
              labels={vaccineLabels}
              title="Vaccine Type"
            />
            <RestrainedSliders
              values={localOptions.variantPrevelance}
              lockedValues={localOptions.lockedVariants}
              setValues={localSetter("variantPrevelance")}
              setLockedValues={localSetter("lockedVariants")}
              labels={variantLabels}
              title="Variant Prevalence"
            />
          </>
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
      <div className="mt-auto">
        <Tippy content={tabs[tab].help}>
          <p className="cursor-default text-flow-pale text-center">Help</p>
        </Tippy>
      </div>
    </div>
  );
};

const tabs = {
  Restrictions: {
    help:
      "The chart on the left is generated dynamically based on the restrictions above. Try moving some of the sliders or flipping a toggle to see how different restrictions affect vaccine requirements.",
  },
  "Vaccine Mix": {
    help:
      "Since some vaccines are more effective than others, vaccine requirements depend on the mix of vaccines being administered. When you're happy with one slider, right click to lock it in place.",
  },
};

type Tab = keyof typeof tabs;
export default VaccineOptions;
