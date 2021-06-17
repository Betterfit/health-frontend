import {
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useUserFacilities } from "APIHooks/facilities";
import { groupUsersByFacility, useMyProfile, useUsers } from "APIHooks/user";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import React, { useState } from "react";
import styles from "./AddUserForm.module.css";

interface AddUserFormData {
  emails: string[];
  facility: string;
  isAdmin: boolean;
}
const AddUserForm = () => {
  const facilitiesQuery = useUserFacilities();
  const myProfileQuery = useMyProfile();
  const usersQuery = useUsers();
  const [formData, setFormData] = useState<AddUserFormData>({
    emails: [],
    facility: "",
    isAdmin: false,
  });
  const users = usersQuery.isSuccess ? usersQuery.data : [];
  const usersByFacility = groupUsersByFacility(users);
  const userOptions = users.filter((user) => {
    // you will never need to add an organization admin to a facility
    if (user.isOrganizationAdmin) return false;
    // don't suggest users that are already in the facility
    if (
      formData.facility in usersByFacility &&
      user.email in usersByFacility[formData.facility]
    )
      return false;
    // we don't want the user's own email to come up as an option
    if (myProfileQuery.isSuccess && myProfileQuery.data.email === user.email)
      return false;
    // otherwise this is the user we can suggest
    return true;
  });
  return (
    <form className={styles.root}>
      <span>
        <p>Add</p>
        <Autocomplete
          multiple
          freeSolo
          onChange={(e, value) => console.log(value)}
          className="flex-1"
          id="email-input"
          aria-label="email"
          options={userOptions}
          getOptionLabel={(user) => user.email}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Email"
              variant="outlined"
              size="small"
            />
          )}
        />
      </span>
      <span>
        <p>to</p>
        <Autocomplete
          className="flex-1"
          id="facility-input"
          aria-label="facility"
          options={facilitiesQuery.isSuccess ? facilitiesQuery.data : []}
          getOptionLabel={(facility) => facility.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Facility"
              variant="outlined"
              size="small"
            />
          )}
        />
      </span>
      <span>
        <p>as</p>
        <RadioGroup aria-label="role" row value="Member">
          <FormControlLabel
            control={<Radio />}
            value="Admin"
            label="Admin"
            labelPlacement="start"
            className="mr-2"
          />
          <FormControlLabel
            control={<Radio />}
            value="Member"
            label="Member"
            labelPlacement="start"
          />
        </RadioGroup>
      </span>
      <PrettyButton text="Confirm" />
    </form>
  );
};
const dummyEmails = ["yash@betterfit.co", "yashaswi@ualberta.ca"];
const roles = ["Admin", "User"];
export default AddUserForm;
