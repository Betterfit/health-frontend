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
import { validate } from "email-validator";
import TypedAPI from "Helpers/typedAPI";
import React, { FormEventHandler, useState } from "react";
import { Facility } from "Types";
import styles from "./AddUserForm.module.css";

const api = new TypedAPI();
interface AddUserFormData {
  emails: string[];
  facility: Facility | null;
  isAdmin: boolean;
}
const AddUserForm = () => {
  const facilitiesQuery = useUserFacilities({
    onSuccess: (data) => {
      // populate facility field automatically
      const facility = data.find((facility) => facility.isAdmin);
      console.log(facility);
      if (!formData.facility && facility)
        setFormData({ ...formData, facility });
    },
  });
  const myProfileQuery = useMyProfile();
  const usersQuery = useUsers();
  const [formData, setFormData] = useState<AddUserFormData>({
    emails: [],
    facility: null,
    isAdmin: false,
  });
  const [errors, setErrors] = useState({ emails: "", facility: "" });
  const facilities = facilitiesQuery.isSuccess
    ? // you can only add users to facilities that you are an admin of
      facilitiesQuery.data.filter((facility) => facility.isAdmin)
    : [];

  const users = usersQuery.isSuccess ? usersQuery.data : [];
  const usersByFacility = groupUsersByFacility(users);
  const userOptions = users.filter((user) => {
    // you will never need to add an organization admin to a facility
    if (user.isOrganizationAdmin) return false;
    // don't suggest users that are already in the facility
    if (
      formData.facility &&
      formData.facility.pk in usersByFacility &&
      user.email in usersByFacility[formData.facility.pk]
    )
      return false;
    // we don't want the user's own email to come up as an option
    if (myProfileQuery.isSuccess && myProfileQuery.data.email === user.email)
      return false;
    // otherwise this is the user we can suggest
    return true;
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = (e: React.FormEvent) => {
    e.preventDefault();
    const facility = formData.facility;
    if (!facility) {
      setErrors({ ...errors, facility: "Pick a facility." });
      return;
    }
    formData.emails.forEach((email) => {
      const user = userOptions.find((user) => user.email === email);
      if (user) {
        api.addExistingUserToFacility(
          user.email,
          facility.url,
          formData.isAdmin
        );
      } else {
        api.addNewUserToFacility(email, facility.pk, formData.isAdmin);
      }
    });
  };
  return (
    <form className={styles.root} onSubmit={onSubmit}>
      <span>
        <p>Add</p>
        <Autocomplete
          multiple
          freeSolo
          value={formData.emails}
          onChange={(e, emails) => {
            console.log(emails);
            if (!validate(emails[emails.length - 1])) {
              setErrors({ ...errors, emails: "Invalid email" });
              return;
            }
            setErrors({ ...errors, emails: "" });
            setFormData({
              ...formData,
              emails: emails.filter((email) => validate(email)),
            });
          }}
          className="flex-1"
          id="email-input"
          aria-label="email"
          options={userOptions.map((user) => user.email)}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Email"
              variant="outlined"
              size="small"
              autoFocus
              error={Boolean(errors.emails)}
              helperText={errors.emails}
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
          value={formData.facility}
          options={facilities}
          getOptionLabel={(facility) => facility.name}
          onChange={(e, facility) => {
            setFormData({ ...formData, facility });
            setErrors({ ...errors, facility: "" });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Facility"
              error={Boolean(errors.facility)}
              variant="outlined"
              size="small"
              required
            />
          )}
        />
      </span>
      <span>
        <p>as</p>
        <RadioGroup
          aria-label="role"
          row
          value={formData.isAdmin ? "Admin" : "Member"}
          onChange={(e) => {
            e.target.value === "Admin"
              ? setFormData({ ...formData, isAdmin: true })
              : setFormData({ ...formData, isAdmin: false });
          }}
        >
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
export default AddUserForm;
