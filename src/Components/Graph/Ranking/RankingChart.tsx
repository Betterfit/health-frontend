import GraphApi from "Helpers/graphApi";
import { roundToNDecimals } from "Helpers/mathUtils";
import MaterialTable from "material-table";
import React from "react";
import { useQuery } from "react-query";
import { TimeSeriesKey } from "Types";
import { graphTabs, TimeSeriesTab } from "../TimeSeries/TimeSeriesOptions";

const graphApi = new GraphApi();

interface RankingChartProps {
  tabKey: TimeSeriesKey;
}
const RankingChart = ({ tabKey }: RankingChartProps) => {
  const curTab = graphTabs.find((tab) => tab.key === tabKey) as TimeSeriesTab;
  const field = curTab.apiKey;
  const { data } = useQuery([field], () => graphApi.getRegionRankings(field));

  const tableData = data?.map((region) => ({
    healthRegion: region.healthRegion,
    province: region.province,
    field:
      curTab.nDecimals === undefined
        ? region.field
        : roundToNDecimals(region.field, curTab.nDecimals),
  }));

  return (
    <MaterialTable
      title={`Top Health Region by ${curTab.heading}`}
      columns={[
        { title: "Health Region", field: "healthRegion" },
        { title: "Province/State", field: "province" },
        { title: curTab.heading, field: "field" },
      ]}
      data={tableData ? tableData : []}
      style={{ backgroundColor: "transparent", color: "white" }}
      options={{
        headerStyle: { backgroundColor: "transparent", color: "white" },
        filterRowStyle: { color: "white" },
        searchFieldStyle: { color: "white" },
      }}
    />
  );
};

export default RankingChart;
