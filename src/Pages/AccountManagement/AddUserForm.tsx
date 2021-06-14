import {
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useUserFacilities } from "APIHooks/facilities";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import React from "react";
import styles from "./AddUserForm.module.css";

const AddUserForm = () => {
  const facilitiesQuery = useUserFacilities();
  return (
    <form className={styles.root}>
      <span>
        <p>Add</p>
        <Autocomplete
          multiple
          freeSolo
          className="flex-1"
          id="email-input"
          aria-label="email"
          options={dummyEmails}
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
