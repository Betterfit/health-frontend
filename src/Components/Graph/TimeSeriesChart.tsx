import Checkbox from "Components/Forms/Checkbox";
import SideBarTabs from "Components/Graph/SideBarTab";
import {
  CovidTimeSeriesHookRet,
  normalizeByPopulation
} from "Helpers/covidDataUtils";
import { dayFormatter } from "Helpers/dateUtils";
import { interpolateNulls, roundToNDecimals } from "Helpers/mathUtils";
import moment from "moment";
import React, { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis
} from "recharts";
import "tui-chart/dist/tui-chart.css";
import { TimeSeriesKey } from "Types";

interface TimeSeriesTab {
  heading: string;
  key: TimeSeriesKey;
  descr: string;
  nDecimals?: number;
  disableInterpolation?: boolean;
  disableNormalization?: boolean;
}

const graphTabs: TimeSeriesTab[] = [
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

const clearTab = {
  heading: "Clear All",
  key: "clear",
  descr: "Remove all Health Regions from the graph.",
};

const defaultChartOptions = {
  chart: {
    width: 525,
    height: 400,
    title: "Data by Health Region",
  },
  yAxis: {
    title: "Data",
  },
  xAxis: {
    title: "Date",
    type: "date",
    dateFormat: "YYYY-MM-DD",
  },
  series: {
    showDot: false,
    zoomable: true,
  },
  legend: {
    align: "bottom",
  },
};

const chartColors = [
  "#00A9FF",
  "#00BD9F",
  "#FFB840",
  "#FF5A47",
  "#785FFF",
  "#F28B8C",
  "#989486",
  "#51707D",
];

interface TimeSeriesChartProps {
  width: number;
  height: number;
  covidData: CovidTimeSeriesHookRet;
}

interface DataPoint {
  date: string;
  [healthRegion: string]: number | string | null;
}

const TimeSeriesChart = ({
  width = 525,
  height = 400,
  covidData,
}: TimeSeriesChartProps) => {
  const {
    timeSeries,
    daysBack,
    setDaysBack,
    dates,
    clearAllRegions,
    regions,
  } = covidData;
  const [tabKey, setTabKey] = useState(graphTabs[0].key);
  const curTab = graphTabs.find((tab) => tab.key === tabKey) || graphTabs[0];
  // data will be normalized per 100k population in health region if this is true
  const [per100k, setPer100k] = useState(false);
  const [interpolate, setInterpolate] = useState(true);

  // optional data transforms (normalization, interpolation) performed here
  const transformed = timeSeries.map((regionalData) => {
    let data = regionalData[tabKey];
    if (interpolate && !curTab.disableInterpolation) {
      // interpolation can cause fractional values but having 10.5 cases doesn't make sense
      data = interpolateNulls(data).map((datum) =>
        datum === null || curTab.nDecimals === undefined
          ? datum
          : roundToNDecimals(datum, curTab.nDecimals)
      );
    }
    if (per100k) data = normalizeByPopulation(regionalData.population, data);
    return {
      regionName: regionalData.healthRegion,
      data,
    };
  });

  // Go here to see how data has to be formatted
  // https://recharts.org/en-US/api/LineChart
  const displayData: DataPoint[] = dates.map((date) => ({
    date: dayFormatter(moment(date)),
  }));

  for (const regionalData of transformed) {
    const regionName = regionalData.regionName;
    regionalData.data.forEach(
      (datum, i) => (displayData[i][regionName] = datum)
    );
  }

  // user clicks new cases, active cases, daily deaths, clear all
  const handleTabClick = (key: TimeSeriesKey | "clear") => {
    key === "clear" ? clearAllRegions() : setTabKey(key);
    // R0 and resolutionTime don't make sense normalized by population
    if (key === "r0" || key === "resolutionTime") {
      setPer100k(false);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col md:flex-row pb-2 justify-center">
        <div className="w-1/10 flex flex-col justify-start">
          <SideBarTabs
            tabs={graphTabs}
            activeTab={tabKey}
            handleClick={handleTabClick}
            clearTab={clearTab}
          />
          <TimePeriodSelectionBox
            daysBack={daysBack}
            setDaysBack={setDaysBack}
          />
          <div className="flex flex-col items-end my-1 space-y-1">
            {!curTab.disableNormalization && (
              <Checkbox
                name="Per 100k"
                value={per100k}
                setValue={setPer100k}
                title="Normalizes data by population so that regions with different populations can be compared."
                disabled={tabKey === "r0" || tabKey === "resolutionTime"}
              />
            )}
            {!curTab.disableInterpolation && (
              <Checkbox
                name="Interpolate"
                value={interpolate}
                setValue={setInterpolate}
                title="Fills in missing data points with linear interpolation"
              />
            )}
          </div>
        </div>
        <div className="w-11/12 flex">
          <LineChart width={width} height={height} data={displayData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              name="Date"
              // domain={[
              //   displayData[0].epochTime,
              //   displayData[displayData.length - 1].epochTime,
              // ]}
              // tickFormatter={epochTime => new Date(epochTime).toISOString().split('T')[0]}
            />
            <YAxis />
            <ChartTooltip />

            <Legend />
            {regions.map(({ healthRegion }, i) => (
              <Line
                type="monotone"
                dataKey={healthRegion}
                // repeats colors if there are too many lines
                stroke={chartColors[i % chartColors.length]}
              />
            ))}
          </LineChart>
        </div>
      </div>
      {regions.length === 0 && (
        <p className="text-center text-sm">
          Select Health Regions to add to the graph
        </p>
      )}
    </>
  );
};

interface TimePeriodSelectionBoxProps {
  daysBack: number;
  setDaysBack: (newVal: number) => void;
}
const TimePeriodSelectionBox = ({
  daysBack,
  setDaysBack,
}: TimePeriodSelectionBoxProps) => {
  const onChange = (e :React.ChangeEvent<HTMLSelectElement>) => setDaysBack(parseInt(e.target.value));

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
      className="uppercase text-xxs tracking-extra-wide"
      value={daysBack}
    >
      {timePeriodOptions.map((option, i) => (
        <option key={i} value={option.value} className="text-blue text-xs">
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default TimeSeriesChart;
