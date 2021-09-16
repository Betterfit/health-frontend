import { useUserFacilities } from "APIHooks/facilities";
import AdminTabs from "Components/Content/AdminTabs";
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
      <Title text="Users and Facilities" extraClasses={styles.title} />
      <MyFacilities />
      <AddUsers />
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
            content: (
              <ul>
                {facilitiesQuery.data.map((facility, i) => (
                  <li key={i} className={styles.facility}>
                    <button>{facility.name}</button>
                  </li>
                ))}
              </ul>
            ),
          },
          {
            header: "Add Facility",
            icon: "add",
            content: <AddFacilityForm handleClose={() => setTabIndex(0)} />,
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
