import React, { useState, useEffect } from "react";

import GraphApi from "Helpers/graphApi";
import FilterFields from "Components/Graph/FilterFields";
import SideBarTabs from "Components/Graph/SideBarTab";
import healthRegions from "Data/healthRegions";

import moment from "moment";
import "tui-chart/dist/tui-chart.css";
import { LineChart } from "@toast-ui/react-chart";
import { addWeeklyUptick, createDateArray } from "Helpers/covidDataUtils";

const parseGraphQL = (data, today, startDate) => {
    let parsedData = {
        "British Columbia": {},
        Alberta: {},
        Manitoba: {},
        Saskatchewan: {},
        Ontario: {},
        Quebec: {},
        "Newfoundland and Labrador": {},
        "Prince Edward Island": {},
        "Nova Scotia": {},
        "New Brunswick": {},
    };

    // each entry contains statistics on covid cases in a health region on a particular day
    const regionDays = data["data"]["allCases"]["edges"];

    const reportedDates = createDateArray(startDate, today);
    // loop through our case data and append it to each regions array so we can easily display it
    regionDays.forEach((regionDay) =>
        parseRegionDay(regionDay, parsedData, reportedDates)
    );
    addWeeklyUptick(parsedData);
    filterFirst7Days(parsedData);
    // add the reported date afterwards so it doesn't interfere with computing weekly uptick
    parsedData["reportedDate"] = reportedDates.slice(7);
    return parsedData;
};

// the weekly uptick isn't computed for the first 7 days (since we don't have the previous days)
// so we filter them out of all of the heatlh regions
const filterFirst7Days = (parsedData) => {
    for (const province of Object.values(parsedData))
        for (const healthRegion of Object.values(province))
            for (const key of Object.keys(healthRegion))
                healthRegion[key] = healthRegion[key].slice(7);
    console.log(parsedData)
};

// parsed region-days will accumalate in arrays in parsedData
const parseRegionDay = (regionDay, parsedData, reportedDates) => {
    const healthRegion = regionDay.node.healthRegion.healthRegion;
    const province = regionDay.node.healthRegion.province;
    const idx = reportedDates.indexOf(regionDay.node.reportedDate);

    if (!(healthRegion in parsedData[province])) {
        parsedData[province][healthRegion] = {
            activeCases: new Array(reportedDates.length).fill(0),
            newCases: new Array(reportedDates.length).fill(0),
            deaths: new Array(reportedDates.length).fill(0),
        };
    }

    const regionData = parsedData[province][healthRegion];
    regionData.activeCases[idx] = regionDay.node.activeCases;
    regionData.newCases[idx] = regionDay.node.newCases;
    regionData.deaths[idx] = regionDay.node.deaths;
};

const options = {
    chart: {
        width: 525,
        height: 400,
        title: "Data By Health Regions",
    },
    yAxis: {
        title: "Health Regions",
    },
    xAxis: {
        title: "Date",
        type: "date",
    },
    series: {
        showDot: false,
        zoomable: true,
    },
    legend: {
        align: "bottom",
    },
};

const graphTabs = [
    { heading: "Active Cases", key: "activeCases" },
    { heading: "New Cases", key: "newCases" },
    { heading: "Daily Deaths", key: "deaths" },
    { heading: "Weekly Uptick", key: "uptick" },
];

const clearTab = { heading: "Clear All", key: "clear" };

const graphApi = new GraphApi();
// get todays date
// and end range for date
const today = moment().subtract(1, "days");
const endDate = moment().subtract(14, "days");

const Graph = () => {
    const [caseData, setCaseData] = useState(null);
    const [displayData, setDisplayData] = useState({
        categories: [],
        series: [],
    });
    // these states might be unecessary, however we have to distinguish between provinces
    // since some health regions have the same name
    const [selectionRegions, setSelectedRegions] = useState([]);
    const [curTab, setCurTab] = useState(graphTabs[0].key);

    const getGraphData = async () =>
        await graphApi
            .getCaseData(
                `reportedDateGt: "${endDate
                    .clone()
                    .subtract(1, "days")
                    .format(
                        "YYYY-MM-DD"
                    )}", first: 1600, sortBy: "reportedDateAsc"`
            )
            .then((response) => {
                let caseData = parseGraphQL(response.data, today, endDate);
                setCaseData(caseData);
                setDisplayData({
                    categories: caseData.reportedDate,
                    series: [],
                });
            })
            .catch((err) => console.log(err));

    useEffect(() => {
        getGraphData();
    }, []);

    const FilterData = (() => {
        return Object.keys(healthRegions).map((key, idx) => {
            return {
                heading: key,
                content: healthRegions[key],
            };
        });
    })();

    // add a region to the graph
    const addRegionToGraph = (e, province, region) => {
        e.preventDefault();

        const newSeries = displayData.series.concat();
        const newCategories = displayData.categories.concat();
        const newSelectedRegions = selectionRegions.concat();

        // break out of onclick if region has already been added
        // TODO does checking if the element exists in the graph already have any issues
        for (let i = 0; i < newSeries.length; i++) {
            if (newSeries[i].name === region) {
                return;
            }
        }

        newSeries.push({ name: region, data: caseData[province][region][curTab] });
        newSelectedRegions.push({ province: province, healthRegion: region });

        setDisplayData({
            categories: newCategories,
            series: newSeries
        });
        setSelectedRegions(newSelectedRegions);
    };

    // handle click when changing tabs so display data is reflected
    // also handle clicking the clear tab
    const handleTabChange = (key, heading) => {
        let categories = displayData.categories.concat();

        if (key === clearTab.key) {
            setSelectedRegions([]);
            setDisplayData({
                categories: categories,
                series: [],
            });
        } else {
            setCurTab(key);

            let newData = selectionRegions.map((region) => ({
                name: region.healthRegion,
                data: caseData[region.province][region.healthRegion][key],
            }));

            setDisplayData({
                categories: categories,
                series: newData,
            });
        }
    };

    return (
        <div>
            <h2 class="text-dark-blue text-2xl pb-6 ml-3 border-b border-title-border mb-3">
                COVID-19 Data
            </h2>
            <div className="flex w-full flex-row pb-2">
                <div className="w-1/12 flex">
                    <SideBarTabs
                        tabs={graphTabs}
                        activeTab={curTab}
                        handleClick={handleTabChange}
                        clearTab={clearTab}
                    />
                </div>
                <div className="w-11/12 flex">
                    <LineChart data={displayData} options={options} />
                </div>
            </div>
            <FilterFields
                filterData={FilterData}
                onClickEvent={addRegionToGraph}
            />
        </div>
    );
};

export default Graph;
