import { useCovidTimeSeries } from "Helpers/covidDataUtils";
import { roundToNDecimals } from "Helpers/mathUtils";
import { findLastNonNull } from "Helpers/utils";
import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { HealthRegion, RegionalCovidTimeSeries, VaccineStats } from "Types";

interface VaccineChartProps {
  regions: HealthRegion[];
}

const VaccineChart = ({ regions }: VaccineChartProps) => {
  const { timeSeries } = useCovidTimeSeries(regions, 30);
  const displayData = timeSeries.map((regionTimeSeries) =>
    vaccineStatsFromTimeSeries(regionTimeSeries)
  );
  return (
    <ResponsiveContainer width="100%">
      <BarChart
        data={displayData}
        margin={{ right: 50, top: 20, left: 20, bottom: 20 }}
      >
        <XAxis dataKey="healthRegion" stroke="white" />
        <Tooltip
          formatter={(value) => (value as number).toLocaleString()}
          cursor={{ fill: "#0A3A42" }}
        />
        <Legend
          formatter={(value) => <span className="text-white">{value}</span>}
        />
        <YAxis
          dataKey="pop1000s"
          type="number"
          label={{
            value: "Residents",
            position: "left",
            angle: -90,
            // added text-anchor so that the y-axis label is centered vertically
            // accepts an svg style object
            style: { "text-anchor": "middle", fill: "white" },
          }}
          tickFormatter={(tick) =>
            Math.round(tick / 1000).toLocaleString() + "K"
          }
          stroke="white"
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
    </ResponsiveContainer>
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
