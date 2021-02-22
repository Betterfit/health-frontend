import {
  normalizeByPopulation,
  useCovidTimeSeries
} from "Helpers/covidDataUtils";
import { dayFormatter } from "Helpers/dateUtils";
import { interpolateNulls, roundToNDecimals } from "Helpers/mathUtils";
import moment from "moment";
import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis
} from "recharts";
import { HealthRegion, TimeSeriesKey } from "Types";
import { graphTabs } from "./TimeSeriesOptions";

interface DataPoint {
  date: string;
  [healthRegion: string]: number | string | null;
}
interface TimeSeriesChartProps {
  regions: HealthRegion[];
  tabKey: TimeSeriesKey;
  daysBack: number;
  per100k: boolean;
  interpolate: boolean;
}

const TimeSeriesChart = ({
  regions,
  tabKey,
  daysBack,
  per100k,
  interpolate,
}: TimeSeriesChartProps) => {
  const { timeSeries, dates } = useCovidTimeSeries(regions, daysBack);
  const curTab = graphTabs.find((tab) => tab.key === tabKey) || graphTabs[0];
  // data will be normalized per 100k population in health region if this is true

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
    if (per100k && !curTab.disableNormalization)
      data = normalizeByPopulation(regionalData.population, data);
    return {
      regionName: regionalData.healthRegion,
      data,
      dates: regionalData.reportedDates,
    };
  });

  // Go here to see how data has to be formatted
  // https://recharts.org/en-US/api/LineChart
  const displayData: DataPoint[] = dates.map((date) => ({
    date: dayFormatter(moment(date)),
  }));

  for (const regionalData of transformed) {
    const regionName = regionalData.regionName;
    regionalData.data.forEach((datum, i) => {
      if (i < displayData.length) displayData[i][regionName] = datum;
    });
  }

  return (
    <ResponsiveContainer width="100%">
      <LineChart data={displayData} margin={{ right: 50, top: 20, bottom: 10 }}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="date" name="Date" stroke="white" />
        <YAxis stroke="white"/>
        <ChartTooltip />

        {/* <Legend /> */}
        {regions.map(({ healthRegion }, i) => (
          <Line
            type="monotone"
            dataKey={healthRegion}
            // repeats colors if there are too many lines
            stroke={chartColors[i % chartColors.length]}
            animationDuration={800}
            dot={{fill: "#072B35"}}
            key={i}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
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

export default TimeSeriesChart;
