import GraphApi from "Helpers/graphApi";
import { roundToNDecimals } from "Helpers/mathUtils";
import MaterialTable from "material-table";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Country, HealthRegion, TimeSeriesKey } from "Types";
import { graphTabs, TimeSeriesTab } from "../TimeSeries/TimeSeriesOptions";

const graphApi = new GraphApi();

interface RankingChartProps {
  tabKey: TimeSeriesKey;
  per100k: boolean;
  groupByProvince: boolean;
  countries: Country[];
  toggleRegionSelection: (region: HealthRegion) => void;
}
const RankingTable = ({
  tabKey,
  per100k,
  groupByProvince,
  countries,
  toggleRegionSelection,
}: RankingChartProps) => {
  const curTab = graphTabs.find((tab) => tab.key === tabKey) as TimeSeriesTab;
  const field = curTab.apiKey;
  const normalizeByPop = per100k && !curTab.disableNormalization;
  const { data } = useQuery(
    [...countries, field, normalizeByPop, groupByProvince],
    () =>
      graphApi.getRegionRankings(
        field,
        normalizeByPop,
        groupByProvince,
        countries
      )
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
    // round and format
    field: (curTab.nDecimals === undefined
      ? region.field
      : roundToNDecimals(region.field, curTab.nDecimals)
    ).toLocaleString(),
  }));

  const colOptions = { sorting: false, draggable: false };
  const fieldTitle =
    per100k && !groupByProvince ? curTab.heading + " Per 100k" : curTab.heading;
  return (
    <div ref={containerRef} className="h-full">
      <MaterialTable
        title={`Top Health Regions by ${curTab.heading}`}
        columns={[
          { ...colOptions, title: "Rank", field: "rank" },
          // only show health region column if we're not grouping by province
          ...(!groupByProvince
            ? [{ ...colOptions, title: "Health Region", field: "healthRegion" }]
            : []),
          { ...colOptions, title: "Province/State", field: "province" },
          { ...colOptions, title: fieldTitle, field: "field" },
        ]}
        data={tableData ? tableData : []}
        style={{ backgroundColor: "transparent", color: "white" }}
        onRowClick={(e, rowData) => {
          // adds the clicked row as a selected region
          if (rowData?.healthRegion && rowData.province)
            toggleRegionSelection({
              healthRegion: rowData.healthRegion,
              province: rowData.province,
            });
        }}
        options={{
          headerStyle: {
            backgroundColor: "var(--navy)",
            color: "white",
            position: "sticky",
            height: 5,
            top: 0,
          },
          rowStyle: {
            height: 5,
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
