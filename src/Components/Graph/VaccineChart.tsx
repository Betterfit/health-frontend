import { roundToNDecimals } from "Helpers/mathUtils";
import { findLastNonNull } from "Helpers/utils";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { HealthRegion, RegionalCovidTimeSeries, VaccineStats } from "Types";

interface VaccineChartProps {
  width: number;
  height: number;
  timeSeries: RegionalCovidTimeSeries[];
  regions: HealthRegion[];
  toggleRegionSelection: (toToggle: HealthRegion) => void;
  clearAllRegions: () => void;
}

const VaccineChart = ({ width, height, timeSeries }: VaccineChartProps) => {
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
        <Tooltip formatter={(value) => (value as number).toLocaleString()} />
        <Legend />
        <YAxis
          dataKey="pop1000s"
          type="number"
          label={{
            value: "Residents",
            position: "left",
            angle: -90,
            // added so that the y-axis label is centered vertically
            style: { "text-anchor": "middle" },
          }}
          tickFormatter={(tick) =>
            Math.round(tick / 1000).toLocaleString() + "K"
          }
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
  const totalRecovered = findLastNonNull(timeSeries.cumRecoveries);
  // default value of 1.4 used if r value not found
  // clamp value to 1.1 so vaccines required is never negative
  
  const r0 = Math.max(1.1, findLastNonNull(timeSeries.r0, 1.4));
  const activeCases = findLastNonNull(timeSeries.activeCases);
  const needVaccine =
    ((1 - 1 / r0) * population - totalRecovered) / VACCINE_EFFICACY;
  const sickAfterHerdImmunity = simulateInfections(activeCases);
  const notSickAfterHerdImmunity =
    population - needVaccine - sickAfterHerdImmunity - totalRecovered;
  // const needVaccine =
  return {
    province: timeSeries.province,
    healthRegion: timeSeries.healthRegion,
    // scale by thousands so the chart looks better
    // not scaling currently, but leaving as we may need to change back
    pop1000s: timeSeries.population,
    needVaccine: scaleAndRound(needVaccine),
    totalRecovered: scaleAndRound(totalRecovered),
    sickAfterHerdImmunity: scaleAndRound(sickAfterHerdImmunity),
    notSickAfterHerdImmunity: scaleAndRound(notSickAfterHerdImmunity),
  };
};

const scaleAndRound = (val: number, scale = 1, nDecimals = 0): number =>
  roundToNDecimals(val / scale, nDecimals);

/**
 * Finds the total number of new infections when R < 1 (meaning the disease is dying out)
 * @param startingCases Number of active cases
 * @param r The reproduction rate of the virus
 * @return How many new people will get infected
 */
const simulateInfections = (startingCases: number): number => {
  let currentCases = startingCases;
  let totalInfections = 0;
  while (currentCases > 1) {
    currentCases = currentCases * HERD_IMMUNITY_R;
    totalInfections += currentCases;
  }
  return totalInfections;
};

export default VaccineChart;
