import { useUserFacilities } from "APIHooks/facilities";
import { useUsers } from "APIHooks/user";
import { ErrorMessage } from "Components/Content/ErrorMessage";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import Title from "Components/Content/Title";
import React, { Dispatch, useState } from "react";
import styles from "./AccountManagement.module.css";
import AddFacilityForm from "./AddFacilityForm";
import AddUserForm from "./AddUserForm";

const AccountManagement = () => {
  return (
    <div className={styles.root}>
      <MyFacilities />
      <AddUsers />
      <UserTable />
    </div>
  );
};

const MyFacilities = () => {
  const facilitiesQuery = useUserFacilities();
  const [open, setOpen] = useState(false);
  if (facilitiesQuery.isLoading || facilitiesQuery.isIdle)
    return <LoadingSpinner />;

  if (facilitiesQuery.isError) return <ErrorMessage />;

  return (
    <div className={styles.facilities}>
      <div className="mb-0 flex">
        <div className="flex-grow pl-4">
          <Title text="My Facilities" />
        </div>
        <Tab open={open} setOpen={setOpen} text="Add Facility" />
      </div>
      <div className={open ? styles.openBox : styles.box}>
        {open ? (
          <AddFacilityForm />
        ) : (
          facilitiesQuery.data.map((facility, i) => (
            <div className={styles.facility} key={i}>
              {facility.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const AddUsers = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.addAccounts}>
      <div className="mb-0 flex">
        <div className="flex-grow pl-4">
          <Title text="" />
        </div>
        <Tab open={open} setOpen={setOpen} text="Add Users" />
      </div>
      <div className={open ? styles.box : styles.box}>
        {open ? (
          <AddUserForm />
        ) : (
          <p className="text-center">0 pending invitations</p>
        )}
      </div>
    </div>
  );
};

const UserTable = () => {
  const usersQuery = useUsers();
  const users = usersQuery.isSuccess ? usersQuery.data : [];
  const organizationAdmins = users.filter((user) => user.isOrganizationAdmin);
  const facilityAdmins = users.filter(
    (user) =>
      !user.isOrganizationAdmin &&
      user.facilityMembership.some((membership) => membership.isAdmin)
  );
  const members = users.filter(
    (user) =>
      !user.isOrganizationAdmin &&
      user.facilityMembership.every((membership) => !membership.isAdmin)
  );
  return (
    <div className={styles.users}>
      <Title text="Users" />
      <div>
        <h3>Organization Admins</h3>
        {organizationAdmins.map((user) => (
          <div>
            <span>{user.email}</span>
            <span>{`${user.firstName} ${user.lastName}`}</span>
          </div>
        ))}
      </div>
      {users.map((user) => (
        <div>{user.email}</div>
      ))}
    </div>
  );
};

interface TabProps {
  open: boolean;
  setOpen: Dispatch<boolean>;
  text: string;
}
const Tab = ({ open, setOpen, text }: TabProps) => {
  return (
    <button
      onClick={() => setOpen(!open)}
      className={
        "flex bg-sky-blue hover:bg-sky-blue  p-2 rounded-t-lg border-primary-blue border-t-2 border-l-2 border-r-2 "
      }
    >
      {open ? (
        <span className="material-icons">remove</span>
      ) : (
        <span className="material-icons">add</span>
      )}
      {text}
    </button>
  );
};
export default AccountManagement;
