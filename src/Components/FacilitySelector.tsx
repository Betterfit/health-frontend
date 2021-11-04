import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
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
  const { data: allFacilities } = useUserFacilities();
  const facilities =
    allFacilities && allFacilities.filter((facility) => facility.active);
  if (!facilityId && facilities && facilities.length > 0)
    selectFacility(facilities[0].id);
  return (
    <TextField
      value={facilityId}
      onChange={(e) => {
        selectFacility(Number(e.target.value));
      }}
      className="mb-2 bg-white"
      id="facilitySelect"
      label={label}
      variant="outlined"
      size="small"
      select
      fullWidth
    >
      {facilities?.map((facility) => (
        <MenuItem key={facility.id} value={facility.id}>
          {facility.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FacilitySelector;
