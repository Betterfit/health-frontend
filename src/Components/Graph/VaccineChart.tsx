import Chip from "Components/Content/Chip";
import { roundToNDecimals } from "Helpers/mathUtils";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { HealthRegion, RegionalCovidTimeSeries } from "Types";

const data = [
  {
    healthRegion: "Edmonton",
    population: 1320,
    totalRecovered: 20.3,
    needVaccine: 670,
    sickAfterHerdImmunity: 12.3,
  },
  {
    healthRegion: "Calgary",
    population: 1551,
    totalRecovered: 23.3,
    needVaccine: 840,
    sickAfterHerdImmunity: 17.5,
  },
  {
    healthRegion: "Winnipeg",
    population: 721,
    totalRecovered: 8.4,
    needVaccine: 400,
    sickAfterHerdImmunity: 9,
  },
  {
    healthRegion: "Toronto Public Health",
    population: 2732,
    totalRecovered: 105,
    needVaccine: 1890,
    sickAfterHerdImmunity: 80,
  },
];

interface VaccineChartProps {
  width: number;
  height: number;
  timeSeries: RegionalCovidTimeSeries[];
  regions: HealthRegion[];
  toggleRegionSelection: (toToggle: HealthRegion) => void;
  clearAllRegions: () => void;
}

const VaccineChart = ({
  width,
  height,
  timeSeries,
  regions,
  toggleRegionSelection,
  clearAllRegions,
}: VaccineChartProps) => {
  const displayData = data.map((region) => ({
    ...region,
    freebies: roundToNDecimals(
      region.population -
        region.totalRecovered -
        region.needVaccine -
        region.sickAfterHerdImmunity,
      1
    ),
  }));
  return (
    <div className="mb-4 flex flex-col md:flex-row">
      <BarChart
        width={width}
        height={height}
        data={displayData}
        margin={{ left: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="healthRegion" />
        <Tooltip />
        <Legend />
        <YAxis
          dataKey="population"
          type="number"
          label={{
            value: "Residents - 1000s",
            position: "left",
            angle: -90,
            // added so that the y-axis label is centered vertically
            style: { "text-anchor": "middle" },
          }}
        />
        <Bar
          dataKey="needVaccine"
          stackId="a"
          name="Require Vaccination"
          fill="#EE6677"
        />
        <Bar
          dataKey="freebies"
          stackId="a"
          fill="#66CCEE"
          name="HI: Will Not Get Sick"
        />
        <Bar
          dataKey="totalRecovered"
          stackId="a"
          name="Already Immune"
          fill="#228833"
        />
        <Bar
          dataKey="sickAfterHerdImmunity"
          stackId="a"
          name="HI: Will Get Sick"
          fill="#CCBB44"
        />
      </BarChart>
      <SelectedRegions
        {...{ regions, toggleRegionSelection, clearAllRegions }}
      />
    </div>
  );
};

interface SelectedRegionsProps {
  regions: HealthRegion[];
  toggleRegionSelection: (toToggle: HealthRegion) => void;
  clearAllRegions: () => void;
}

const SelectedRegions = ({
  regions,
  toggleRegionSelection,
}: SelectedRegionsProps) => {
  return (
    <div className="flex flex-col items-center m-4">
      {regions.map((region, i) => (
        <Chip
          key={i}
          text={region.healthRegion}
          onDelete={() => toggleRegionSelection(region)}
        />
      ))}
    </div>
  );
};

export default VaccineChart;
