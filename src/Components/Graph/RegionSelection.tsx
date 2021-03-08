import healthRegions from "Data/healthRegions.json";
import React from "react";
import { HealthRegion, Selectable } from "Types";

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
  return (
    <div
      className="bg-flow-darkbluegrey col-start-2 flex-grow flex flex-col p-4 overflow-y-scroll"
      style={{ gridRow: "1 / 7" }}
    >
      {regionTray.map(({ item: region, selected }, i) => (
        <div
          className="flex justify-between pb-1 mb-3 border-b-2 border-flow-pale"
          key={i}
        >
          <label
            htmlFor={`${region.healthRegion}-checkbox`}
            className="text-flow-white text-xl"
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
        className="text-red-400 text-xl disabled:opacity-10 mt-auto"
        disabled={regionTray.length === 0}
      >
        Clear
      </button>
    </div>
  );
};

interface ProvinceDropdowns {
  toggleSelection: (toToggle: HealthRegion) => void;
}

const ProvinceDropdowns = ({ toggleSelection }: ProvinceDropdowns) => {
  const regions = healthRegions as { [province: string]: string[] };
  return (
    <div
      className="bg-flow-darkbluegrey overflow-y-scroll max-h-full col-start-2 mt-5"
      style={{ gridRow: "7/13" }}
    >
      {Object.keys(healthRegions)
        .sort()
        .map((province, i) => (
          <details className="flex flex-col text-flow-white mb-1" key={i}>
            <summary className="bg-flow-bluegrey py-2 pl-1 cursor-pointer text-lg rounded-sm ">
              {province}
            </summary>
            {regions[province].map((region, i) => (
              <button
                className="mb-1 ml-3 py-2 pl-2 text-left"
                onClick={() =>
                  toggleSelection({ province: province, healthRegion: region })
                }
                key={i}
              >
                {region}
              </button>
            ))}
          </details>
        ))}
    </div>
  );
};

export default RegionSelection;
