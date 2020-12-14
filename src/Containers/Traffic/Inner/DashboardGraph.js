import React, { useState, useEffect } from "react";

import GraphApi from "Helpers/graphApi";
import FilterFields from "Components/Graph/FilterFields";
import SideBarTabs from "Components/Graph/SideBarTab";
import healthRegions from "Data/healthRegions";

import "tui-chart/dist/tui-chart.css";
import { LineChart } from "@toast-ui/react-chart";
import { normalizeByPopulation, useCovidData } from "Helpers/covidDataUtils";
import Checkbox from "Components/Forms/Checkbox";

const graphTabs = [
    { heading: "Active Cases", key: "activeCases" },
    { heading: "New Cases", key: "newCases" },
    { heading: "Daily Deaths", key: "deaths" },
    { heading: "Resolution Time", key: "resolutionTime" },
    { heading: "R0", key: "r0" },
];

const clearTab = { heading: "Clear All", key: "clear" };

const defaultChartOptions = {
    chart: {
        width: 525,
        height: 400,
        title: "Data by Health Region",
    },
    yAxis: {
        title: "Data",
    },
    xAxis: {
        title: "Date",
        type: "date",
        dateFormat: "YYYY-MM-DD",
    },
    series: {
        showDot: false,
        zoomable: true,
    },
    legend: {
        align: "bottom",
    },
};

const generateChartOptions = ({ width, height }) => ({
    ...defaultChartOptions,
    chart: {
        ...defaultChartOptions.chart,
        width,
        height,
    },
});

const Graph = ({ width = 525, height = 400}) => {
    const {
        timeSeries,
        clearAllRegions,
        daysBack,
        setDaysBack,
        regions,
        toggleRegionSelection,
        dates,
    } = useCovidData();
    const [curTab, setCurTab] = useState(graphTabs[0].key);
    // data will be normalized per 100k population in health region if this is true
    const [per100k, setPer100k] = useState(false);

    // used to show collapsible lists of health regions in different provinces
    const filterData = Object.keys(healthRegions).map((provinceName) => ({
        heading: provinceName,
        content: healthRegions[provinceName],
    }));

    const toDisplay = {
        categories: dates,
        series: timeSeries.map((regionalData) => ({
            name: regionalData.healthRegion,
            data: per100k
                ? normalizeByPopulation(
                      regionalData.population,
                      regionalData[curTab]
                  )
                : regionalData[curTab],
        })),
    };

    const chartOptions = generateChartOptions({ width, height });

    // when a user selects a region from the collapsible list of health regions
    const onRegionClick = (e, province, region) =>
        toggleRegionSelection({ province: province, healthRegion: region });

    // user clicks new cases, active cases, daily deaths, clear all
    const handleTabClick = (key) =>
        key === "clear" ? clearAllRegions() : setCurTab(key);

    return (
        <>
            <div className="flex w-full flex-row pb-2">
                <div className="w-1/10 flex flex-col justify-start">
                    <SideBarTabs
                        tabs={graphTabs}
                        activeTab={curTab}
                        handleClick={handleTabClick}
                        clearTab={clearTab}
                    />
                    <TimePeriodSelectionBox
                        daysBack={daysBack}
                        setDaysBack={setDaysBack}
                    />
                    <div className="py-2 mx-1 align-end">
                        <Checkbox
                            name="Per 100k"
                            value={per100k}
                            setValue={setPer100k}
                            title="Normalizes data by population so that regions with different populations can be compared."
                        />
                    </div>
                </div>
                <div className="w-11/12 flex">
                    <LineChart data={toDisplay} options={chartOptions} />
                </div>
            </div>
            {regions.length === 0 && (
                <p className="text-center text-sm">
                    Select Health Regions to add to the graph
                </p>
            )}
            <FilterFields
                filterData={filterData}
                onClickEvent={onRegionClick}
            />
        </>
    );
};

const TimePeriodSelectionBox = ({ daysBack, setDaysBack }) => {
    const onChange = (e) => setDaysBack(parseInt(e.target.value));

    const timePeriodOptions = [
        { value: 7, label: "Past Week" },
        { value: 14, label: "Past 2 Weeks" },
        { value: 30, label: "Past Month" },
        { value: 90, label: "Past 3 Months" },
    ];

    return (
        <select
            id="time period selection"
            name="time period"
            onChange={onChange}
            className="uppercase text-xxs tracking-extra-wide"
            value={daysBack}
        >
            {timePeriodOptions.map((option, i) => (
                <option
                    key={i}
                    value={option.value}
                    className="text-blue text-xs"
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Graph;
