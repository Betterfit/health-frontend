import { Moment } from "moment";
import { NationalCovidTimeSeries, RegionDay } from "Types";
import healthRegions from "Data/healthRegions.json";
import { time } from "console";

/**
 * Creates an array containing all the days between startDate-1 and endDate-1 formatted as YYYY-MM-DD.
 * The start and end dates should be moment objects.
 */
export const createDateArray = (startDate: Moment, endDate: Moment) => {
    // we set the dates back to the start of the day
    const reportedDates = [];
    endDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    while (
        startDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }) <=
        endDate
    ) {
        reportedDates.push(startDate.format("YYYY-MM-DD"));
        startDate = startDate.clone().add(1, "d");
    }
    return reportedDates;
};

// parsed region-days will accumalate in arrays in parsedData
const parseRegionDay = (
    regionDay: RegionDay,
    parsedData: NationalCovidTimeSeries,
    reportedDates: string[]
) => {
    const healthRegion = regionDay.healthRegion.healthRegion;
    const province = regionDay.healthRegion.province;
    const idx = reportedDates.indexOf(regionDay.reportedDate);

    if (!(healthRegion in parsedData[province])) {
        parsedData[province][healthRegion] = {
            population: regionDay.healthRegion.population2016,
            activeCases: new Array(reportedDates.length).fill(0),
            newCases: new Array(reportedDates.length).fill(0),
            deaths: new Array(reportedDates.length).fill(0),
        };
    }

    const regionData = parsedData[province][healthRegion];
    regionData.activeCases[idx] = regionDay.activeCases;
    regionData.newCases[idx] = regionDay.newCases;
    regionData.deaths[idx] = regionDay.deaths;
};

/**
 * Creates time series lists for each health region with missing days padded with null.
 * For each health region, includes lists of active cases, deaths and new cases.
 * A list of dates is also returned, which is the same length as each list of datapoints in the health regions.
 * Having the data in this format makes it easier to consume in graphs, etc.
 * @param regionDays
 * @param today The last date in the list of region days
 * @param startDate The earliest date in the list of region days
 */
export const createTimeSeriesFromRegionDays = (
    regionDays: RegionDay[],
    today: Moment,
    startDate: Moment
): {
    nationalCovidTimeSeries: NationalCovidTimeSeries;
    reportedDates: string[];
} => {
    const timeSeries: NationalCovidTimeSeries = {};
    for (const provinceName of Object.keys(healthRegions))
        timeSeries[provinceName] = {};


    const reportedDates = createDateArray(startDate, today);
    // loop through our case data and append it to each regions array so we can easily display it
    regionDays.forEach((regionDay: RegionDay) =>
        parseRegionDay(regionDay, timeSeries, reportedDates)
    );
    console.log(timeSeries)
    return { nationalCovidTimeSeries: timeSeries, reportedDates };
};
