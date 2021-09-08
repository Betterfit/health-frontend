import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import { fullName } from "APIHooks/user";
import React from "react";
import { User } from "Types";
import styles from "./UserPicker.module.css";

const UserPicker = ({
  label,
  users,
  selectedUser,
  setSelectedUser,
  className,
}: {
  label: string;
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (newUser: User | null) => void;
  className?: string;
}) => {
  return (
    <Autocomplete
      autoSelect
      value={selectedUser}
      onChange={(e, user) => {
        setSelectedUser(user);
      }}
      options={users}
      className={className}
      filterSelectedOptions
      getOptionLabel={(user) =>
        fullName(user) ? `${fullName(user)} - ${user.email}` : user.email
      }
      renderOption={(user) => (
        <div className={styles.option}>
          <span>{fullName(user) ? `${fullName(user)} ` : ""}</span>
          <span style={{ overflow: "ellipsis" }}>{user.email}</span>
        </div>
      )}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" size="small" />
      )}
    />
  );
};

export default UserPicker;
