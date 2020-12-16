import moment, { Moment } from "moment";
import { useState } from "react";
import { useQueries } from "react-query";
import { HealthRegion, RegionalCovidTimeSeries, RegionDay } from "Types";
import GraphApi from "./graphApi";
import { rollingAverage, roundToNDecimals } from "./mathUtils";

const graphApi = new GraphApi();
const ROLLING_AVG_INTERVAL = 5;

export const useCovidData = () => {
    const [regions, setRegions] = useState<HealthRegion[]>([
        { province: "Alberta", healthRegion: "Edmonton Zone" },
    ]);
    const [daysBack, setDaysBack] = useState(30);

    const startDate = moment().subtract(daysBack, "days");
    const dates = createDateArray(startDate, moment());
    // This is the perfect use case for a beta feature in react-query, see docs here:
    // https://react-query-beta.tanstack.com/reference/useQueries
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
            // 30 minutes until this data is considered stale (param takes ms)
            staleTime: 1000 * 60 * 30,
            queryFn: () =>
                fetchAndTransformRegionData(
                    region.healthRegion,
                    region.province,
                    startDate
                ),
        }))
    );

    const clearAllRegions = () => setRegions([]);

    const toggleRegionSelection = (toToggle: HealthRegion) => {
        // add region if it's not already selected
        if (!regions.some((region) => regionsAreEqual(region, toToggle)))
            setRegions([...regions, toToggle]);
        // remove region is it is selected
        else
            setRegions(
                regions.filter((region) => !regionsAreEqual(region, toToggle))
            );
    };

    const timeSeries = data
        .filter((region: any) => region.data)
        .map((region: any) => region.data) as RegionalCovidTimeSeries[];

    return {
        timeSeries,
        clearAllRegions,
        toggleRegionSelection,
        regions,
        daysBack,
        setDaysBack,
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
    const reportedDates = createDateArray(startDate, moment());
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
        startDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }) <=
        endDate
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

    for (const regionDay of regionDays) {
        // skips all missing region days
        while (regionDay.reportedDate > reportedDates[day_idx]) {
            activeCases.push(null);
            newCases.push(null);
            deaths.push(null);
            resolutionTime.push(null);
            r0.push(null);
            day_idx++;
        }
        activeCases.push(regionDay.activeCases);
        newCases.push(regionDay.newCases);
        deaths.push(regionDay.deaths);
        resolutionTime.push(regionDay.resolutionTime);
        r0.push(regionDay.r0V0);
        day_idx++;
    }

    // fills in all days after the last region day
    while (activeCases.length < reportedDates.length) {
        activeCases.push(null);
        newCases.push(null);
        deaths.push(null);
        resolutionTime.push(null);
        r0.push(null);
    }

    return {
        population: regionDays[0].healthRegion.population2016,
        province: regionDays[0].healthRegion.province,
        healthRegion: regionDays[0].healthRegion.healthRegion,
        activeCases,
        newCases,
        deaths,
        resolutionTime: rollingAverage(resolutionTime, ROLLING_AVG_INTERVAL),
        r0: rollingAverage(r0, ROLLING_AVG_INTERVAL),
        reportedDates,
    };
};

const regionsAreEqual = (region1: HealthRegion, region2: HealthRegion) =>
    region1.province === region2.province &&
    region1.healthRegion === region2.healthRegion;

export const normalizeByPopulation = (
    regionPop: number,
    data: (number | null)[]
): (number | null)[] => {
    const num100k = regionPop / (100 * 1000);
    return data.map((datum) => (datum === null ? null : roundToNDecimals(datum / num100k, 2)));
};
