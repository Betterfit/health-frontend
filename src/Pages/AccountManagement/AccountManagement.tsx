import { useUserFacilities } from "APIHooks/facilities";
import { ErrorMessage } from "Components/Content/ErrorMessage";
import Icon from "Components/Content/Icon";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import Title from "Components/Content/Title";
import React, { Dispatch, useState } from "react";
import styles from "./AccountManagement.module.css";
import AddFacilityForm from "./AddFacilityForm";
import AddUserForm from "./AddUserForm";
import PaymentMethods from "./PaymentMethods";
import PendingInvitations from "./PendingInvitations";
import UserTable from "./UserTable";

const AccountManagement = () => {
  return (
    <div className={styles.root}>
      <MyFacilities />
      <AddUsers />
      <PaymentMethods />
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
      <div className="mb-0 flex ">
        <div className="flex-grow ">
          <Title text="My Facilities" />
        </div>
        <AdminTab
          open={open}
          setOpen={setOpen}
          text={open ? "View Facilities" : "Add Facility"}
        />
      </div>
      <div className={styles.cardWithTab}>
        {open ? (
          <AddFacilityForm handleClose={() => setOpen(false)} />
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
        <AdminTab open={open} setOpen={setOpen} text="Add Users" />
      </div>
      <div className={styles.cardWithTab}>
        {open ? (
          <AddUserForm closeForm={() => setOpen(false)} />
        ) : (
          <PendingInvitations />
        )}
      </div>
    </div>
  );
};

interface Tab {
  key: string;
  header: string;
  icon?: string;
}
interface AdminTabProps {
  open: boolean;
  setOpen: Dispatch<boolean>;
  text: string;
}
export const AdminTab = ({ open, setOpen, text }: AdminTabProps) => {
  return (
    <button
      aria-label={text}
      onClick={() => setOpen(!open)}
      className={
        "flex bg-sky-blue hover:bg-sky-blue  p-2 rounded-t-lg border-primary-blue border-t-2 border-l-2 border-r-2 focus:outline-none"
      }
    >
      <Icon name={open ? "remove" : "add"} />
      {text}
    </button>
  );
};

const AdminTabs = ({
  tabs,
  selectedTab,
}: {
  tabs: Tab[];
  selectedTab: string;
}) => {
  return <div></div>;
};

export default AccountManagement;
