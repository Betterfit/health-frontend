import RankingChart from "Components/Graph/Ranking/RankingChart";
import RegionSelection from "Components/Graph/RegionSelection";
import TimeSeriesChart from "Components/Graph/TimeSeries/TimeSeriesChart";
import TimeSeriesOptions, {
  graphTabs,
} from "Components/Graph/TimeSeries/TimeSeriesOptions";
import VaccineChart from "Components/Graph/Vaccine/VaccineChart";
import VaccineOptions from "Components/Graph/Vaccine/VaccineOptions";
import { defaultVaccineUsage } from "Components/Graph/Vaccine/VaccineTypePicker";
import { regionsAreEqual } from "Helpers/covidDataUtils";
import FlowSquares from "Pages/Covid/FlowSquares";
import React, { useState } from "react";
import {
  ChartType,
  HealthRegion,
  Selectable,
  TimeSeriesKey,
  VaccineChartOptions,
} from "Types";

interface DashboardGraphProps {
  whichChart: ChartType;
}

const DashboardGraph = ({ whichChart }: DashboardGraphProps) => {
  // State is kept here so that selected regions/time series tab etc are kept consistent when switching between the vaccine and time series charts.
  // In the future, it might be worth encoding this information in the url.
  const [regionTray, setRegionTray] = useState<Selectable<HealthRegion>[]>([
    {
      item: { province: "Alberta", healthRegion: "Edmonton Zone" },
      selected: true,
    },
    {
      item: { province: "Ontario", healthRegion: "Toronto Public Health" },
      selected: true,
    },
    {
      item: { province: "British Columbia", healthRegion: "Fraser" },
      selected: true,
    },
  ]);
  const regions = regionTray
    .filter((selectable) => selectable.selected)
    .map((selectable) => selectable.item);

  // time series chart options
  // which time series tab is currently selected
  const [tabKey, setTabKey] = useState<TimeSeriesKey>(graphTabs[0].key);
  const [per100k, setPer100k] = useState<boolean>(false);
  const [interpolate, setInterpolate] = useState<boolean>(true);
  // how many days back do we fetch covid data
  const [daysBack, setDaysBack] = useState(30);

  // vaccine chart options
  const [vaccineOptions, setVaccineOptions] = useState<VaccineChartOptions>({
    restaurantCapacity: 100,
    retailCapacity: 100,
    gymCapacity: 100,
    essentialRetailCapacity: 100,
    worshipCapacity: 100,
    masksMandatory: false,
    curfew: false,
    elementarySchoolsOpen: false,
    secondarySchoolsOpen: false,
    vaccineUsage: defaultVaccineUsage(),
    lockedVaccines: [],
  });

  const clearAllRegions = () => setRegionTray([]);

  const toggleRegionSelection = (toToggle: HealthRegion) => {
    const existingIdx = regionTray.findIndex(({ item: region }) =>
      regionsAreEqual(region, toToggle)
    );
    if (existingIdx > -1) {
      // toggle selection of existing region in tray
      const existing = regionTray[existingIdx];
      const newTray = regionTray.filter((item, i) => i != existingIdx);
      newTray.push({ item: existing.item, selected: !existing.selected });
      setRegionTray(newTray);
    }
    // add region to tray otherwise
    else setRegionTray([...regionTray, { item: toToggle, selected: true }]);
  };
  let chart;
  if (whichChart === "timeseries")
    chart = (
      <TimeSeriesChart
        {...{ regions, tabKey, daysBack, per100k, interpolate }}
      />
    );
  else if (whichChart === "vaccine")
    chart = (
      <VaccineChart
        {...{
          regions,
          options: vaccineOptions,
        }}
      />
    );
  else chart = <RankingChart {...{}} />;

  const options = (
    <>
      {whichChart === "timeseries" ? (
        <TimeSeriesOptions
          {...{
            tabKey,
            setTabKey,
            daysBack,
            setDaysBack,
            interpolate,
            setInterpolate,
            per100k,
            setPer100k,
          }}
        />
      ) : (
        <VaccineOptions
          options={vaccineOptions}
          setOptions={setVaccineOptions}
        />
      )}

      <RegionSelection
        {...{
          regionTray,
          toggleSelection: toggleRegionSelection,
          clearAllRegions,
        }}
      />
    </>
  );

  return <FlowSquares chart={chart} options={options} />;
};

export default DashboardGraph;
