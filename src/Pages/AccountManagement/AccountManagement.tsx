import { useUserFacilities } from "APIHooks/facilities";
import AdminTabs from "Components/Content/AdminTabs";
import { ErrorMessage } from "Components/Content/ErrorMessage";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import React, { useState } from "react";
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
  const [tabIndex, setTabIndex] = useState(0);
  if (facilitiesQuery.isLoading || facilitiesQuery.isIdle)
    return <LoadingSpinner />;

  if (facilitiesQuery.isError) return <ErrorMessage />;

  return (
    <div className={styles.facilities} data-testid="My Facilities">
      <AdminTabs
        tabs={[
          {
            header: "My Facilities",
            content: facilitiesQuery.data.map((facility, i) => (
              <div className={styles.facility} key={i}>
                {facility.name}
              </div>
            )),
          },
          {
            header: "Add Facility",
            icon: "add",
            content: <AddFacilityForm handleClose={() => setTabIndex(1)} />,
          },
        ]}
        selectedIndex={tabIndex}
        setSelectedIndex={setTabIndex}
        ariaLabel="facilities"
      />
    </div>
  );
};

const AddUsers = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <AdminTabs
      ariaLabel="Add Users"
      tabs={[
        { header: "Invitations", content: <PendingInvitations /> },
        {
          header: "Add Users",
          icon: "add",
          content: <AddUserForm closeForm={() => setTabIndex(0)} />,
        },
      ]}
      selectedIndex={tabIndex}
      setSelectedIndex={setTabIndex}
    />
  );
};

export default AccountManagement;
