import { useUserFacilities } from "Models/facilities";
import React from "react";

const FacilitySelector = ({
  label = "Facility",
  facilityId,
  selectFacility,
}: {
  label?: string;
  facilityId?: number;
  selectFacility: (facilityId: number) => void;
}) => {
  const { data: facilities } = useUserFacilities();
  if (!facilityId && facilities && facilities.length > 0)
    selectFacility(facilities[0].id);
  return (
    <div className="flex flex-col items-start">
      <label
        className="pl-1 uppercase text-betterfit-graphite text-xs tracking-extra-wide opacity-75 font-semibold"
        htmlFor="facility"
      >
        {label}
      </label>
      <select
        name="facility"
        className="bg-transparent text-lg"
        onChange={(e) => {
          selectFacility(Number(e.target.value));
        }}
        value={facilityId}
      >
        {facilities?.map((facility) => (
          <option key={facility.id} value={facility.id}>
            {facility.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FacilitySelector;
