import { useUserFacilities } from "APIHooks/facilities";
import AdminTabs, { TabObject } from "Components/Content/AdminTabs";
import { ErrorMessage } from "Components/Content/ErrorMessage";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import Title from "Components/Content/Title";
import React, { useState } from "react";
import styles from "./AccountManagement.module.css";
import AddFacilityForm from "./AddFacilityForm";
import AddUserForm from "./AddUserForm";
import PendingInvitations from "./PendingInvitations";
import UserTable from "./UserTable";

const AccountManagement = () => {
  return (
    <div className={styles.root}>
      <MyFacilities />
      <AddUsers />
      {/* <PaymentMethods /> */}
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
    <div className={styles.facilities} data-testid="My Facilities">
      <div className="mb-0 flex ">
        <div className="flex-grow ">
          <Title text="My Facilities" />
        </div>
        {/* <AdminTab
          open={open}
          setOpen={setOpen}
          text={open ? "View Facilities" : "Add Facility"}
        /> */}
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

const addUserTabs: TabObject[] = [
  { header: "Invitations" },
  { header: "Add Users", icon: "add" },
];
const AddUsers = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const tabPanels = [
    <PendingInvitations />,
    <AddUserForm closeForm={() => setTabIndex(0)} />,
  ];
  return (
    <AdminTabs
      ariaLabel="Add Users"
      tabs={addUserTabs}
      selectedIndex={tabIndex}
      setSelectedIndex={setTabIndex}
    >
      {tabPanels[tabIndex]}
    </AdminTabs>
  );
};

export default AccountManagement;
