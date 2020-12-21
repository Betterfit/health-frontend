import FilterFields from "Components/Graph/FilterFields";
import TimeSeriesChart from "Components/Graph/TimeSeriesChart";
import VaccineChart from "Components/Graph/VaccineChart";
import Tabs from "Components/Tabs/Tabs";
import healthRegions from "Data/healthRegions.json";
import { useCovidData } from "Helpers/covidDataUtils";
import React, { useState } from "react";
import "tui-chart/dist/tui-chart.css";

type ChartType = "timeseries" | "vaccine";

const tabs = [
  {
    heading: "Time Series",
    key: "timeseries",
  },
  { heading: "Vaccine", key: "vaccine" },
];

const DashboardGraph = ({ width = 525, height = 400 }) => {
  const [whichChart, setWhichChart] = useState<ChartType>("timeseries");
  const covidData = useCovidData();
  const { toggleRegionSelection } = covidData;

  // used to show collapsible lists of health regions in different provinces
  const filterData = Object.entries(healthRegions).map(
    ([provinceName, regionNames]) => ({
      heading: provinceName,
      content: regionNames,
    })
  );

  // when a user selects a region from the collapsible list of health regions
  const onRegionClick = (e: MouseEvent, province: string, region: string) =>
    toggleRegionSelection({ province: province, healthRegion: region });

  const onChangeChart = (chartType: ChartType) => setWhichChart(chartType);

  return (
    <div className="flex flex-col items-center">
      <Tabs
        tabs={tabs}
        tabCallBack={onChangeChart}
        amount={false}
        headingComp={null}
        longUnderline={false}
      />
      {whichChart === "timeseries" ? (
        <TimeSeriesChart {...{ covidData, width, height }} />
      ) : (
        <VaccineChart {...{ width, height }} />
      )}
      <FilterFields filterData={filterData} onClickEvent={onRegionClick} />
    </div>
  );
};

export default DashboardGraph;
