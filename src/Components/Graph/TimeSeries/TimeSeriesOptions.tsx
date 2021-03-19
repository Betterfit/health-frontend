// import { EuiToolTip } from "@elastic/eui";
import Tippy from "@tippyjs/react";
import FatToggle from "Components/Forms/FatToggle";
import TimePeriodSelection from "Components/Forms/TimePeriodSelection";
import React from "react";
import "tippy.js/dist/tippy.css";
import { TimeSeriesKey } from "Types";

interface TimeSeriesOptionsProps {
  tabKey: TimeSeriesKey;
  daysBack: number;
  interpolate: boolean;
  per100k: boolean;
  setTabKey: (key: TimeSeriesKey) => void;
  setDaysBack: (val: number) => void;
  setInterpolate: (val: boolean) => void;
  setPer100k: (val: boolean) => void;
}
const TimeSeriesOptions = ({
  tabKey,
  daysBack,
  interpolate,
  per100k,
  setTabKey,
  setDaysBack,
  setInterpolate,
  setPer100k,
}: TimeSeriesOptionsProps) => {
  const curTab = graphTabs.find((tab) => tab.key === tabKey) as TimeSeriesTab;
  return (
    <>
      {/* choose between active cases, deaths, r, etc */}
      <div
        className="flex flex-col col-start-0 space-y-2 justify-items-stretch"
        style={{ gridRow: "1 / 7" }}
      >
        {graphTabs.map((tab, i) => (
          <GraphTab
            {...{ tab, setTabKey, selected: tab.key === tabKey, key: i }}
          />
        ))}
      </div>

      <div className="mt-5 space-y-2" style={{ gridRow: "7 / 13" }}>
        <TimePeriodSelection
          daysBack={daysBack}
          setDaysBack={setDaysBack}
          size="md"
        />

        {!curTab.disableNormalization && (
          // Normalizes data by population so that regions with different populations can be compared.
          <FatToggle
            checked={per100k}
            setChecked={setPer100k}
            label="Per 100k"
          />
        )}
        {!curTab.disableInterpolation && (
          //   title="Fills in missing data points with linear interpolation"
          <FatToggle
            checked={interpolate}
            setChecked={setInterpolate}
            label="Interpolate"
          />
        )}
      </div>
    </>
  );
};
interface GraphTabProps {
  tab: TimeSeriesTab;
  setTabKey: (key: TimeSeriesKey) => void;
  selected: boolean;
}

const GraphTab = ({ tab, setTabKey, selected }: GraphTabProps) => {
  return (
    <button
      className={`w-full flex-grow   text-flow-white flex justify-between items-center ${
        selected ? "bg-flow-darkpale" : "bg-flow-bluegrey"
      }`}
      onClick={() => setTabKey(tab.key)}
    >
      <span className="ml-5">{tab.heading}</span>
      <Tippy content={tab.descr}>
        <p className="mr-5 text-flow-white">?</p>
      </Tippy>
    </button>
  );
};

interface TimeSeriesTab {
  heading: string;
  key: TimeSeriesKey;
  descr: string;
  nDecimals?: number;
  disableInterpolation?: boolean;
  disableNormalization?: boolean;
}

export const graphTabs: TimeSeriesTab[] = [
  {
    heading: "Active Cases",
    key: "activeCases",
    descr: "The total number of individuals that have COVID-10 on a given day.",
    nDecimals: 0,
  },
  {
    heading: "New Cases",
    key: "newCases",
    descr: "The number of new infections reported on a given day.",
    nDecimals: 0,
    // disabled because if the last 5 days are missing data, the the 6th day's new cases/deaths
    // will include the deaths of the last 5 days.
    disableInterpolation: true,
  },
  {
    heading: "Daily Deaths",
    key: "deaths",
    descr: "The number of new deaths reported on a given day.",
    nDecimals: 0,
    disableInterpolation: true,
  },
  {
    heading: "Resolution Time",
    key: "resolutionTime",
    descr:
      "How long it takes for recoveries and deaths to catch up with the number of new cases on a past day.\n If there were 100 new cases today, how long until we can expect to see a day with 100 recoveries and deaths.",
    nDecimals: 0,
    // it doesn't make sense to normalize this metric by population
    disableNormalization: true,
  },
  {
    heading: "R",
    key: "r0",
    descr:
      "Our estimate of COVID-19's reproduction number in this health region.\n Measures how many new infections a contagious person will cause, on average.",
    nDecimals: 2,
    // doesn't make sense to show this per capita
    disableNormalization: true,
  },
];

export default TimeSeriesOptions;
