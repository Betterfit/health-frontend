import GraphApi from "Helpers/graphApi";
import React from "react";
import { useQuery } from "react-query";
import {
  HealthRegion,
  HealthRegionsByCountry,
  HealthRegionsByProvince,
  Selectable
} from "Types";

interface RegionSelectionProps {
  regionTray: Selectable<HealthRegion>[];
  toggleSelection: (toToggle: HealthRegion) => void;
  clearAllRegions: () => void;
}

const RegionSelection = ({
  regionTray,
  toggleSelection,
  clearAllRegions,
}: RegionSelectionProps) => {
  return (
    <>
      <RegionTray {...{ regionTray, toggleSelection, clearAllRegions }} />
      <ProvinceDropdowns toggleSelection={toggleSelection} />
    </>
  );
};

const RegionTray = ({
  regionTray,
  toggleSelection,
  clearAllRegions,
}: RegionSelectionProps) => {
  const sortedRegionTray = regionTray
    .concat()
    .sort((a, b) => a.item.healthRegion.localeCompare(b.item.healthRegion));
  return (
    <div
      className="bg-flow-darkbluegrey col-start-2 flex-grow flex flex-col p-4 overflow-y-scroll"
      style={{ gridRow: "1 / 7" }}
    >
      {sortedRegionTray.map(({ item: region, selected }, i) => (
        <div
          className="flex justify-between pb-1 mb-3 border-b-2 border-flow-pale"
          key={i}
        >
          <label
            htmlFor={`${region.healthRegion}-checkbox`}
            className="text-flow-white text-sm lg:text-xl"
          >
            {region.healthRegion}
          </label>
          <input
            type="checkbox"
            id={`${region.healthRegion}-checkbox`}
            checked={selected}
            onChange={() => toggleSelection(region)}
          />
        </div>
      ))}
      <button
        onClick={clearAllRegions}
        // TODO: fix opacity on disabled
        className="text-red-400 text-md lg:text-xl disabled:opacity-10 mt-auto"
        disabled={regionTray.length === 0}
      >
        Clear
      </button>
    </div>
  );
};

interface ProvinceDropdowns {
  toggleSelection: (toToggle: HealthRegion) => void;
  countriesToShow?: ("US" | "Canada")[];
}

const ProvinceDropdowns = ({
  toggleSelection,
  countriesToShow = ["Canada", "US"],
}: ProvinceDropdowns) => {
  const { data } = useQuery<HealthRegionsByCountry>(
    [],
    new GraphApi().getHealthRegions
  );

  const countries = data ? data : { US: {}, Canada: {} };

  return (
    <div
      className="bg-flow-darkbluegrey overflow-y-scroll max-h-full col-start-2 mt-5"
      style={{ gridRow: "7/13" }}
    >
      {countriesToShow.flatMap((countryName) =>
        Object.keys(countries[countryName])
          .sort()
          .map((provinceName, i) => (
            <ProvinceDropdown
              country={countries[countryName]}
              provinceName={provinceName}
              key={countryName+i}
              toggleSelection={toggleSelection}
           />
          ))
      )}
    </div>
  );
};

interface ProvinceDropdownProps {
  toggleSelection: (toToggle: HealthRegion) => void;
  country: HealthRegionsByProvince | undefined;
  provinceName: string;
}
const ProvinceDropdown = ({
  country,
  provinceName,
  toggleSelection,
}: ProvinceDropdownProps) => {
  if (!country) return null;
  return (
    <details className="flex flex-col flex-shrink-0 text-flow-white mb-1">
      <summary className="bg-flow-bluegrey py-2 pl-1 cursor-pointer text-md md:text-lg rounded-sm ">
        {provinceName}
      </summary>
      {country[provinceName]
        .sort((a, b) => (a.healthRegion > b.healthRegion ? 1 : -1))
        .map((region, i) => (
          <button
            className="mb-1 ml-3 py-2 pl-2 text-left text-md md:text-lg"
            onClick={() => toggleSelection(region)}
            key={i}
          >
            {region.healthRegion}
          </button>
        ))}
    </details>
  );
};

export default RegionSelection;
