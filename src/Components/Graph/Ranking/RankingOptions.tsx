import FatToggle from "Components/Forms/FatToggle";
import React from "react";
import { Country, TimeSeriesKey } from "Types";
import {
  GraphTab,
  graphTabs,
  TimeSeriesTab,
} from "../TimeSeries/TimeSeriesOptions";

interface RankingOptionsProps {
  tabKey: TimeSeriesKey;
  per100k: boolean;
  countries: Country[];
  setTabKey: (key: TimeSeriesKey) => void;
  setPer100k: (val: boolean) => void;
  setCountries: (val: Country[]) => void;
}

const RankingOptions = ({
  tabKey,
  per100k,
  countries,
  setTabKey,
  setPer100k,
  setCountries,
}: RankingOptionsProps) => {
  const curTab = graphTabs.find((tab) => tab.key === tabKey) as TimeSeriesTab;
  const toggleCountry = (country: Country) => {
    if (countries.includes(country))
      setCountries(countries.filter((val) => val !== country));
    else setCountries([...countries, country]);
  };
  return (
    <>
      <div
        className="flex flex-col col-start-0 space-y-2 justify-items-stretch overflow-y-scroll"
        style={{ gridRow: "1 / -1" }}
      >
        {graphTabs.map((tab, i) => (
          <GraphTab
            {...{ tab, setTabKey, selected: tab.key === tabKey, key: i }}
          />
        ))}

        {!curTab.disableNormalization && (
          // Normalizes data by population so that regions with different populations can be compared.
          <FatToggle
            checked={per100k}
            setChecked={setPer100k}
            label="Per 100k"
          />
        )}
        <FatToggle
          checked={countries.includes("Canada")}
          setChecked={() => toggleCountry("Canada")}
          label="Canada"
        />
        <FatToggle
          checked={countries.includes("US")}
          setChecked={() => toggleCountry("US")}
          label="US"
        />
      </div>
    </>
  );
};

export default RankingOptions;
