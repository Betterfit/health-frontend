import moment, { Moment } from "moment";
import { QueryObserverResult, useQueries } from "react-query";
import {
  HealthRegion,
  RegionalCovidTimeSeries,
  RegionDay,
  REstimate,
  VaccineChartOptions
} from "Types";
import GraphApi from "./graphApi";
import { rollingAverage, roundToNDecimals } from "./mathUtils";

const graphApi = new GraphApi();
const ROLLING_AVG_INTERVAL = 5;
// 30 minutes until we consider requests to be stale
const QUERY_STALE_TIME_MS = 1000 * 60 * 30;

// Return value of the covid time series hook
export interface CovidTimeSeriesHookRet {
  timeSeries: RegionalCovidTimeSeries[];
  dates: string[];
}

export const useCovidTimeSeries = (
  regions: HealthRegion[],
  daysBack: number
): CovidTimeSeriesHookRet => {
  const startDate = moment().subtract(daysBack, "days");
  const dates = createDateArray(startDate, moment());
  // https://react-query.tanstack.com/reference/useQueries
  const data = useQueries(
    // We perform a variable number of queries (depending on the number of regions selected)
    // The query key determines if a query should be rerun, so the queries are only rerun if the region or number of days back changes
    regions.map((region) => ({
      queryKey: [
        "covid data",
        region.province,
        region.healthRegion,
        `${daysBack} days back`,
      ],
      staleTime: QUERY_STALE_TIME_MS,
      queryFn: () =>
        fetchAndTransformRegionData(
          region.healthRegion,
          region.province,
          startDate
        ),
    }))
  );

  const timeSeries = data
    .filter((region: any) => region.data)
    .map((region: any) => region.data) as RegionalCovidTimeSeries[];

  return {
    timeSeries,
    dates,
  };
};

const fetchAndTransformRegionData = async (
  healthRegion: string,
  province: string,
  startDate: Moment
): Promise<RegionalCovidTimeSeries> => {
  const regionDays = await graphApi.getCaseData(
    `reportedDateGt: "${startDate
      .clone()
      .subtract(1, "days")
      .format(
        "YYYY-MM-DD"
      )}", healthRegion: "${healthRegion}", province: "${province}", first: 800, sortBy: "reportedDateAsc"`
  );
  const latestDate = regionDays[regionDays.length - 1].reportedDate;
  const reportedDates = createDateArray(startDate, moment(latestDate));
  const regionalTimeSeries = timeSeriesFromRegionDays(
    regionDays,
    reportedDates
  );

  return regionalTimeSeries;
};

/**
 * Creates an array containing all the days between startDate-1 and endDate-1 formatted as YYYY-MM-DD.
 * The start and end dates should be moment objects.
 */
export const createDateArray = (startDate: Moment, endDate: Moment) => {
  // we set the dates back to the start of the day
  const reportedDates = [];
  endDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  while (
    startDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }) <= endDate
  ) {
    reportedDates.push(startDate.format("YYYY-MM-DD"));
    startDate = startDate.clone().add(1, "d");
  }
  return reportedDates;
};

const timeSeriesFromRegionDays = (
  regionDays: RegionDay[],
  reportedDates: string[]
): RegionalCovidTimeSeries => {
  let day_idx = 0;
  const activeCases = [];
  const newCases = [];
  const deaths = [];
  const resolutionTime = [];
  const r0 = [];
  const cumRecoveries = [];

  for (const regionDay of regionDays) {
    // skips all missing region days
    while (regionDay.reportedDate > reportedDates[day_idx]) {
      activeCases.push(null);
      newCases.push(null);
      deaths.push(null);
      resolutionTime.push(null);
      r0.push(null);
      cumRecoveries.push(null);
      day_idx++;
    }
    activeCases.push(regionDay.activeCases);
    newCases.push(regionDay.newCases);
    deaths.push(regionDay.deaths);
    resolutionTime.push(regionDay.resolutionTime);
    r0.push(regionDay.r0V0);
    cumRecoveries.push(regionDay.cumRecoveredCases);
    day_idx++;
  }

  // fills in all days after the last region day
  while (activeCases.length < reportedDates.length) {
    activeCases.push(null);
    newCases.push(null);
    deaths.push(null);
    resolutionTime.push(null);
    r0.push(null);
    cumRecoveries.push(null);
  }

  return {
    population: regionDays[0].healthRegion.population2016,
    province: regionDays[0].healthRegion.province,
    healthRegion: regionDays[0].healthRegion.healthRegion,
    activeCases,
    newCases,
    deaths,
    cumRecoveries,
    resolutionTime: rollingAverage(resolutionTime, ROLLING_AVG_INTERVAL),
    r0: rollingAverage(r0, ROLLING_AVG_INTERVAL),
    reportedDates,
  };
};

export const normalizeByPopulation = (
  regionPop: number,
  data: (number | null)[]
): (number | null)[] => {
  const num100k = regionPop / (100 * 1000);
  return data.map((datum) =>
    datum === null ? null : roundToNDecimals(datum / num100k, 2)
  );
};

export const useREstimate = (
  options: VaccineChartOptions,
  regions: HealthRegion[]
): QueryObserverResult<REstimate>[] => {
  const results = useQueries(
    regions.map((region) => ({
      queryKey: [
        "r estimate",
        region.province,
        region.healthRegion,
        ...Object.values(options),
      ],
      staleTime: QUERY_STALE_TIME_MS,
      queryFn: () => fetchREstimate(options, region),
      // this isn't working atm, but it does with just the singular useQuery hook
      // very strange, I believe it's a bug with react-query
      keepPreviousData: true,
    }))
  );

  const typed = results as QueryObserverResult<REstimate>[];
  return typed;
};

const fetchREstimate =  (
  options: VaccineChartOptions,
  region: HealthRegion
): Promise<REstimate> => {
  const params = {
    healthRegion: region.healthRegion,
    province: region.province,
    date: moment().format("YYYY-MM-DD"),
    restCap: options.restaurantCapacity,
    gymCap: options.gymCapacity,
    retailCap: options.retailCapacity,
    worshipCap: options.worshipCapacity,
    masks: options.masksMandatory,
    curfew: options.curfew,
  };
  return graphApi.getREstimate(params);
};

export const regionsAreEqual = (region1: HealthRegion, region2: HealthRegion) =>
  region1.province === region2.province &&
  region1.healthRegion === region2.healthRegion;

