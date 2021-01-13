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
import { HealthRegion, RegionalCovidTimeSeries, VaccineStats } from "Types";

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
  const displayData = timeSeries.map((regionTimeSeries) =>
    vaccineStatsFromTimeSeries(regionTimeSeries)
  );
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
          dataKey="pop1000s"
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
          dataKey="notSickAfterHerdImmunity"
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
    </div>
  );
};

const VACCINE_EFFICACY = 0.82;
const HERD_IMMUNITY_R = 0.9;

const vaccineStatsFromTimeSeries = (
  timeSeries: RegionalCovidTimeSeries
): VaccineStats => {
  const population = timeSeries.population;
  // we generate random values as placeholders for now
  const totalRecovered = Math.random() * 0.2 * population;
  // default value of 1.4 used if r value not found
  const r0 = findFirstNonNull(timeSeries.r0.reverse(), 1.4);
  const activeCases = findFirstNonNull(timeSeries.activeCases.reverse());
  const needVaccine =
    ((1 - 1 / r0) * population - totalRecovered) / VACCINE_EFFICACY;
  const sickAfterHerdImmunity = simulateInfections(activeCases, r0);
  const notSickAfterHerdImmunity =
    population - needVaccine - sickAfterHerdImmunity - totalRecovered;
  // const needVaccine =
  return {
    province: timeSeries.province,
    healthRegion: timeSeries.healthRegion,
    // scale by thousands so the chart looks better
    pop1000s: timeSeries.population / 1000,
    needVaccine: needVaccine / 1000,
    totalRecovered: totalRecovered / 1000,
    sickAfterHerdImmunity: sickAfterHerdImmunity / 1000,
    notSickAfterHerdImmunity: notSickAfterHerdImmunity / 1000,
  };
};

const simulateInfections = (startingCases: number, r: number): number => {
  let currentCases = startingCases;
  let totalInfections = 0;
  while (currentCases > 1) {
    currentCases = currentCases * HERD_IMMUNITY_R;
    totalInfections += currentCases;
  }
  return totalInfections;
};

function findFirstNonNull<T>(array: (T | null)[], fallback?: T): T {
  const val = array.find((val) => val !== null);
  if (val === undefined)
    if (fallback !== undefined) return fallback;
    else throw "All values were null and no fallback was specified";
  return val as T;
}

export default VaccineChart;
