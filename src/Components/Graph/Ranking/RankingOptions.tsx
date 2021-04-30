import React from "react";
import { TimeSeriesKey } from "Types";
import { GraphTab, graphTabs } from "../TimeSeries/TimeSeriesOptions";

interface RankingOptionsProps {
  tabKey: TimeSeriesKey;
  setTabKey: (key: TimeSeriesKey) => void;
}

const RankingOptions = ({ tabKey, setTabKey }: RankingOptionsProps) => {
  return (
    <div
      className="flex flex-col col-start-0 space-y-2 justify-items-stretch"
      style={{ gridRow: "1 / 7" }}
    >
      {graphTabs.map((tab, i) => (
        <GraphTab
          {...{ tab, setTabKey, selected: tab.key === tabKey, key: i }}
        />
      ))}
    </div>
  );
};

export default RankingOptions;
