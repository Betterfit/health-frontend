import GraphApi from "Helpers/graphApi";
import { roundToNDecimals } from "Helpers/mathUtils";
import MaterialTable from "material-table";
import React, { useRef } from "react";
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
  const container = useRef<HTMLDivElement>(null);
  const tableData = data?.map((region) => ({
    ...region,
    field:
      curTab.nDecimals === undefined
        ? region.field
        : roundToNDecimals(region.field, curTab.nDecimals),
  }));
  const maxHeight = container.current ? container.current.clientHeight : 200;

  const colOptions = { sorting: false, draggable: false };
  return (
    <div ref={container} className="h-full">
      <MaterialTable
        title={`Top Health Region by ${curTab.heading}`}
        columns={[
          { ...colOptions, title: "Rank", field: "rank" },
          { ...colOptions, title: "Health Region", field: "healthRegion" },
          { ...colOptions, title: "Province/State", field: "province" },
          { ...colOptions, title: curTab.heading, field: "field" },
        ]}
        data={tableData ? tableData : []}
        style={{ backgroundColor: "transparent", color: "white" }}
        options={{
          headerStyle: {
            backgroundColor: "var(--navy)",
            color: "white",
            position: "sticky",
            top: 0,
          },
          filterRowStyle: { color: "white" },
          searchFieldStyle: { color: "white" },
          maxBodyHeight: maxHeight,
          pageSize: 50,
          pageSizeOptions: [10, 50, 100],
          draggable: false,
        }}
      />
    </div>
  );
};

export default RankingChart;
