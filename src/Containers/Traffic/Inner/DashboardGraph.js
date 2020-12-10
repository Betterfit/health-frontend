import React, { useState, useEffect } from "react";

import GraphApi from "Helpers/graphApi";
import FilterFields from "Components/Graph/FilterFields";
import SideBarTabs from "Components/Graph/SideBarTab";
import healthRegions from "Data/healthRegions";

import moment from "moment";
import "tui-chart/dist/tui-chart.css";
import { LineChart } from "@toast-ui/react-chart";
import { useCovidData } from "Helpers/covidDataUtils";

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
];

const clearTab = { heading: "Clear All", key: "clear" };

const Graph = () => {
    const {
        timeSeries,
        clearAllRegions,
        daysBack,
        regions,
        toggleRegionSelection,
        dates,
    } = useCovidData();
    const [curTab, setCurTab] = useState(graphTabs[0].key);

    // used to show collapsible lists of health regions in different provinces
    const filterData = Object.keys(healthRegions).map((provinceName) => ({
        heading: provinceName,
        content: healthRegions[provinceName],
    }));

    const toDisplay = {
        categories: dates,
        series: timeSeries.map((regionalData) => ({
            name: regionalData.healthRegion,
            data: regionalData[curTab],
        })),
    };

    // when a user selects a region from the collapsible list of health regions
    const onRegionClick = (e, province, region) =>
        toggleRegionSelection({ province: province, healthRegion: region });

    // user clicks new cases, active cases, daily deaths, clear all
    const handleTabClick = (key) =>
        key === "clear" ? clearAllRegions() : setCurTab(key);

    return (
        <div>
            <h2 className="text-dark-blue text-2xl pb-6 ml-3 border-b border-title-border mb-3">
                COVID-19 Data
            </h2>
            <div className="flex w-full flex-row pb-2">
                <div className="w-1/12 flex">
                    <SideBarTabs
                        tabs={graphTabs}
                        activeTab={curTab}
                        handleClick={handleTabClick}
                        clearTab={clearTab}
                    />
                </div>
                <div className="w-11/12 flex">
                    <LineChart data={toDisplay} options={options} />
                </div>
            </div>
            <FilterFields
                filterData={filterData}
                onClickEvent={onRegionClick}
            />
        </div>
    );
};

export default Graph;
