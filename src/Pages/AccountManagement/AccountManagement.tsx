import { useUserFacilities } from "APIHooks/facilities";
import { ErrorMessage } from "Components/Content/ErrorMessage";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import Title from "Components/Content/Title";
import React, { Dispatch, useState } from "react";
import styles from "./AccountManagement.module.css";
import AddFacilityForm from "./AddFacilityForm";

const AccountManagement = () => {
  return (
    <div className={styles.root}>
      <MyFacilities />
      <AddAccount />
      {/* <div className={styles.users}>Users</div> */}
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
        <Tab open={open} setOpen={setOpen} />
      </div>
      <div className={open ? styles.openBox : styles.box}>
        {open ? (
          <AddFacilityForm />
        ) : (
          facilitiesQuery.data.map((facility,i) => (
            <div className={styles.facility} key={i}>{facility.name}</div>
          ))
        )}
      </div>
    </div>
  );
};

const AddAccount = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.addAccounts}>
      <div className="mb-0 flex">
        <div className="flex-grow pl-4">
          <Title text="" />
        </div>
        <Tab open={open} setOpen={setOpen} />

        <div className={open ? styles.openBox : styles.box}></div>
      </div>
    </div>
  );
};

interface TabProps {
  open: boolean;
  setOpen: Dispatch<boolean>;
}
const Tab = ({ open, setOpen }: TabProps) => {
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
      Add Facility
    </button>
  );
};
export default AccountManagement;
