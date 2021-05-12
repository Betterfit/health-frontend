import GraphApi from "Helpers/graphApi";
import { roundToNDecimals } from "Helpers/mathUtils";
import MaterialTable from "material-table";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Country, TimeSeriesKey } from "Types";
import { graphTabs, TimeSeriesTab } from "../TimeSeries/TimeSeriesOptions";

const graphApi = new GraphApi();

interface RankingChartProps {
  tabKey: TimeSeriesKey;
  per100k: boolean;
  countries: Country[];
}
const RankingTable = ({ tabKey, per100k, countries }: RankingChartProps) => {
  const curTab = graphTabs.find((tab) => tab.key === tabKey) as TimeSeriesTab;
  const field = curTab.apiKey;
  const normalizeByPop = per100k && !curTab.disableNormalization;
  const { data } = useQuery([...countries, field, normalizeByPop], () =>
    graphApi.getRegionRankings(field, normalizeByPop, countries)
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [tableHeight, setTableHeight] = useState(200);
  useLayoutEffect(() => {
    // interval used because the height of the flow squares changes once all the
    // health regions rendered
    const interval = setInterval(() => {
      const containingDiv = containerRef.current;
      if (containingDiv && containingDiv.offsetHeight !== tableHeight)
        setTableHeight(containingDiv.offsetHeight);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const tableData = data?.map((region) => ({
    ...region,
    field:
      curTab.nDecimals === undefined
        ? region.field
        : roundToNDecimals(region.field, curTab.nDecimals),
  }));

  const colOptions = { sorting: false, draggable: false };
  const fieldTitle = per100k ? curTab.heading + " Per 100k" : curTab.heading;
  return (
    <div ref={containerRef} className="h-full">
      <MaterialTable
        title={`Top Health Regions by ${curTab.heading}`}
        columns={[
          { ...colOptions, title: "Rank", field: "rank" },
          { ...colOptions, title: "Health Region", field: "healthRegion" },
          { ...colOptions, title: "Province/State", field: "province" },
          { ...colOptions, title: fieldTitle, field: "field" },
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
          maxBodyHeight: maxTableBodyHeight(tableHeight),
          pageSize: 50,
          pageSizeOptions: [10, 50, 100],
          draggable: false,
        }}
      />
    </div>
  );
};

// the table header/footers height do not change
const maxTableBodyHeight = (tableHeight: number) => {
  const tableHeaderHeight = 64;
  const tableFooterHeight = 52;
  return tableHeight - tableFooterHeight - tableHeaderHeight;
};

export default RankingTable;
