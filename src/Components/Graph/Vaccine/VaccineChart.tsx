import { useCovidTimeSeries, useREstimate } from "Helpers/covidDataUtils";
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
  YAxis,
} from "recharts";
import {
  HealthRegion,
  RegionalCovidTimeSeries,
  REstimate,
  VaccineChartOptions,
  VaccineStats,
} from "Types";
import { computeVaccineEfficacy } from "./VaccineTypePicker";

interface VaccineChartProps {
  regions: HealthRegion[];
  options: VaccineChartOptions;
}

const VaccineChart = ({ regions, options }: VaccineChartProps) => {
  const { timeSeries } = useCovidTimeSeries(regions, 30);
  const rEstimates = useREstimate(options, regions);
  const displayData = timeSeries.map((regionTimeSeries, i) =>
    vaccineStatsFromTimeSeries(
      regionTimeSeries,
      rEstimates[i].data,
      computeVaccineEfficacy(options.vaccineUsage)
    )
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
          contentStyle={{
            backgroundColor: "var(--navy)",
            borderColor: "transparent",
          }}
          labelStyle={{ color: "white" }}
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
            style: { textAnchor: "middle", fill: "white" },
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
          fill="#256A7F"
          isAnimationActive={false}
        />
        <Bar
          dataKey="notSickAfterHerdImmunity"
          stackId="a"
          fill="#28C5D1"
          name="HI: Will Not Get Sick"
        />
        <Bar
          dataKey="totalImmune"
          stackId="a"
          name="Already Immune"
          fill="#3AF6F8"
        />
        <Bar
          dataKey="sickAfterHerdImmunity"
          stackId="a"
          name="HI: Will Get Sick"
          fill="#D3FFE8"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

const HERD_IMMUNITY_R = 0.9;

const vaccineStatsFromTimeSeries = (
  timeSeries: RegionalCovidTimeSeries,
  rEstimate: REstimate | undefined,
  vaccineEfficacy: number
): VaccineStats => {
  const population = timeSeries.population;
  const totalRecovered = findLastNonNull(timeSeries.cumRecoveries);
  const immuneFromVaccine =
    findLastNonNull(timeSeries.cumVaccFull) * vaccineEfficacy;

  // clamp value to 1.1 so vaccines required is never negative
  const r0 = rEstimate
    ? Math.max(1, rEstimate.rV0)
    : Math.max(1, findLastNonNull(timeSeries.r0));
  const activeCases = findLastNonNull(timeSeries.activeCases);
  const needVaccine =
    ((1 - 1 / r0) *
      (population - totalRecovered - activeCases - immuneFromVaccine)) /
    vaccineEfficacy;
  // console.log(needVaccine)
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
    totalImmune: scaleAndRound(totalRecovered + immuneFromVaccine),
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
