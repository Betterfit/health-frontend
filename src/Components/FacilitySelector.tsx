import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { useUserFacilities } from "Models/facilities";
import React from "react";

/**
 * A selection box that allows users to select a facility from those that they
 * have access to.
 */
const FacilitySelector = ({
  label = "Facility",
  facilityId,
  selectFacility,
  addNewFacility,
}: {
  label?: string;
  facilityId?: number;
  selectFacility: (facilityId?: number) => void;
  /**
   * If provided, an additional option will be added to the select box labeled 'Add New {label}'.
   * If chosen, this callback will be executed.
   */
  addNewFacility?: () => void;
}) => {
  const { data: allFacilities } = useUserFacilities();
  const facilities =
    allFacilities && allFacilities.filter((facility) => facility.active);
  if (!facilityId && facilities && facilities.length > 0)
    selectFacility(facilities[0].id);
  if (
    facilityId &&
    facilities &&
    facilities?.find((facility) => facility.id === facilityId)
  )
    selectFacility(undefined);
  return (
    <TextField
      value={facilityId ?? ""}
      onChange={(e) => {
        if (addNewFacility && e.target.value === "new") addNewFacility();
        else selectFacility(Number(e.target.value));
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
      {addNewFacility && (
        <MenuItem key="addNew" value="new">
          + Add New {label} +
        </MenuItem>
      )}
    </TextField>
  );
};

export default FacilitySelector;
