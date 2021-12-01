import AdminTabs from "Components/Content/AdminTabs";
import { ErrorMessage } from "Components/Content/ErrorMessage";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import Title from "Components/Content/Title";
import Dialog from "Components/Dialog";
import { sortBy } from "lodash";
import { useUserFacilities } from "Models/facilities";
import React, { useState } from "react";
import { Facility } from "Types";
import styles from "./AccountManagement.module.css";
import AddFacilityForm from "./AddFacilityForm";
import AddUserForm from "./AddUserForm";
import PendingInvitations from "./PendingInvitations";
import UserTable from "./UserTable";

const AccountManagement = () => {
  return (
    <div className={styles.root}>
      <Title extraClasses={styles.title}>Users and Facilities</Title>
      <MyFacilities />
      <AddUsers />
      <UserTable />
    </div>
  );
};

const MyFacilities = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className={styles.facilities} data-testid="My Facilities">
      <AdminTabs
        tabs={[
          {
            header: "My Facilities",
            content: <FacilityList />,
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

const FacilityList = () => {
  const facilitiesQuery = useUserFacilities();
  const [openFacility, setOpenFacility] = useState<Facility | null>(null);
  if (facilitiesQuery.isLoading || facilitiesQuery.isIdle)
    return <LoadingSpinner />;

  if (facilitiesQuery.isError) return <ErrorMessage />;
  const closeDialog = () => setOpenFacility(null);
  let facilities = facilitiesQuery.data.filter((facility) => facility.active);
  facilities = sortBy(facilities, ["name"]);
  return (
    <>
      {facilities.map((facility) => (
        <button
          key={facility.id}
          className={styles.facility}
          onClick={() => setOpenFacility(facility)}
        >
          {facility.name}
        </button>
      ))}
      {openFacility && (
        <Dialog open={openFacility != null} onClose={closeDialog}>
          <AddFacilityForm
            handleClose={closeDialog}
            existingFacility={openFacility}
            className="p-4"
          />
        </Dialog>
      )}
    </>
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
