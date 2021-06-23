import Tippy from "@tippyjs/react";
import { useCovidTimeSeries, useREstimate } from "Helpers/covidDataUtils";
import { roundToNDecimals } from "Helpers/mathUtils";
import { findLastNonNull } from "Helpers/utils";
import { computeVaccineEfficacy } from "Helpers/vaccineUtils";
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

interface VaccineChartProps {
  regions: HealthRegion[];
  options: VaccineChartOptions;
  isAuthenticated: boolean;
}

const VaccineChart = ({
  regions,
  options,
  isAuthenticated,
}: VaccineChartProps) => {
  const { timeSeries } = useCovidTimeSeries(regions, 30);
  const rEstimates = useREstimate(options, regions);
  const displayData = timeSeries.map((regionTimeSeries, i) =>
    vaccineStatsFromTimeSeries(
      regionTimeSeries,
      isAuthenticated ? rEstimates[i].data : undefined,
      computeVaccineEfficacy(options.vaccineUsage, options.variantPrevelance)
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
          formatter={(value) => (
            <Tippy
              content={
                // descriptions have first part cut off so that it can be dynamically swapped between "number of" and "proportion of" in the future
                "The number of " +
                categories.find((category) => category.name === value)?.descr
              }
            >
              <span className="text-white">{value}</span>
            </Tippy>
          )}
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
        {categories.map((category) => (
          <Bar stackId="a" {...category} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

const categories = [
  {
    dataKey: "needVaccine",
    name: "Require Vaccination",
    descr:
      "people that will need to get a vaccination in order to reach herd immunity.",
    fill: "#256A7F",
  },
  {
    dataKey: "notSickAfterHerdImmunity",
    name: "HI: Will Not Get Sick",
    descr:
      "unvaccinated people that would not get sick once herd immunity is reached.",
    fill: "#28C5D1",
  },
  {
    dataKey: "totalImmune",
    name: "Already Immune",
    descr:
      "people that have either recovered from COVID-19 or have recieved a full vaccination.",
    fill: "#3AF6F8",
  },
  {
    dataKey: "sickAfterHerdImmunity",
    name: "HI: Will Get Sick",
    descr:
      "unvaccinated people that would get sick after herd immunity (HI) is reached",
    fill: "#D3FFE8",
  },
];

const HERD_IMMUNITY_R = 0.9;

const vaccineStatsFromTimeSeries = (
  timeSeries: RegionalCovidTimeSeries,
  rEstimate: REstimate | undefined,
  vaccineEfficacy: number
): VaccineStats => {
  const population = timeSeries.population;
  const totalRecovered = findLastNonNull(
    timeSeries.cumRecoveries,
    0.25 * population
  );
  const immuneFromVaccine =
    findLastNonNull(timeSeries.cumVaccFull, 0.25 * population) *
    vaccineEfficacy;

  // clamp value to 1.1 so vaccines required is never negative
  const r0 = rEstimate
    ? Math.max(1, rEstimate.rV0)
    : Math.max(1.1, findLastNonNull(timeSeries.r0, 1.1));
  const activeCases = findLastNonNull(
    timeSeries.activeCases,
    0.02 * population
  );

  const susceptiblePopulation =
    population - totalRecovered - activeCases - immuneFromVaccine;

  let needVaccine = ((1 - 1 / r0) * susceptiblePopulation) / vaccineEfficacy;
  needVaccine = Math.min(needVaccine, susceptiblePopulation);

  const sickAfterHerdImmunity = Math.min(
    simulateInfections(activeCases),
    susceptiblePopulation - needVaccine
  );

  const notSickAfterHerdImmunity =
    susceptiblePopulation - needVaccine - sickAfterHerdImmunity;
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
