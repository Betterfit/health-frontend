import FatToggle from "Components/Forms/FatToggle";
import React from "react";
import { TimeSeriesKey } from "Types";
import {
  GraphTab,
  graphTabs,
  TimeSeriesTab,
} from "../TimeSeries/TimeSeriesOptions";

interface RankingOptionsProps {
  tabKey: TimeSeriesKey;
  per100k: boolean;
  setTabKey: (key: TimeSeriesKey) => void;
  setPer100k: (val: boolean) => void;
}

const RankingOptions = ({
  tabKey,
  per100k,
  setTabKey,
  setPer100k,
}: RankingOptionsProps) => {
  const curTab = graphTabs.find((tab) => tab.key === tabKey) as TimeSeriesTab;
  return (
    <>
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
      {!curTab.disableNormalization && (
        // Normalizes data by population so that regions with different populations can be compared.
        <FatToggle checked={per100k} setChecked={setPer100k} label="Per 100k" />
      )}
    </>
  );
};

export default RankingOptions;
