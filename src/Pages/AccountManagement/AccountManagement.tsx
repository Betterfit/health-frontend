import { useUserFacilities } from "APIHooks/facilities";
import { fullName, useUsers } from "APIHooks/user";
import { ErrorMessage } from "Components/Content/ErrorMessage";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import Title from "Components/Content/Title";
import Tabs from "Components/Tabs/Tabs";
import React, { Dispatch, useState } from "react";
import { UserProfile } from "Types";
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
        <AdminTab open={open} setOpen={setOpen} text="Add Facility" />
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
        <AdminTab open={open} setOpen={setOpen} text="Add Users" />
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

const userCategories = [
  {
    heading: "All Users",
    key: "allUsers",
  },
  {
    heading: "Organization Admins",
    key: "organizationAdmins",
  },
  {
    heading: "Facility Admins",
    key: "facilityAdmins",
  },
  { heading: "Members", key: "members" },
] as const;

type UserType = typeof userCategories[number]["key"];
const UserTable = () => {
  const [userType, setUserType] = useState<UserType>("allUsers");
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
  const usersByType = {
    allUsers: users,
    organizationAdmins,
    facilityAdmins,
    members,
  };
  return (
    <div className={styles.users}>
      <Title text="Users" />
      <Tabs
        tabs={userCategories.map((category) => ({
          ...category,
          amount: usersByType[category.key].length,
        }))}
        amount
        tabCallBack={(key) => setUserType(key as UserType)}
      />
      <div className={styles.userLists}>
        {userCategories
          .filter(
            ({ key }) =>
              // if allUsers is selected, we show a user list of every type
              key !== "allUsers" &&
              (userType === "allUsers" || key === userType)
          )
          .map((category) => (
            <UserTypeList
              title={category.heading}
              users={usersByType[category.key]}
            />
          ))}
      </div>
    </div>
  );
};

const UserTypeList = ({
  users,
  title,
}: {
  users: UserProfile[];
  title: string;
}) => {
  return (
    <div className={styles.box}>
      <table className={styles.userList}>
        <caption>{title}</caption>
        <tr>
          <th>Email</th>
          <th>Name</th>
          <th>Facilities</th>
          <th>Actions</th>
        </tr>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>{user.email}</td>
              <td>{fullName(user)}</td>
              <td>
                {user.facilityMembership.map(
                  (membership) => membership.facility
                )}
              </td>
              <td>
                <span
                  className="material-icons-outlined"
                  style={{ color: "var(--primary-blue)" }}
                >
                  edit
                </span>
                <span
                  className="material-icons-outlined"
                  style={{ color: "var(--plastic-red)" }}
                >
                  delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface AdminTabProps {
  open: boolean;
  setOpen: Dispatch<boolean>;
  text: string;
}
const AdminTab = ({ open, setOpen, text }: AdminTabProps) => {
  return (
    <button
      onClick={() => setOpen(!open)}
      className={
        "flex bg-sky-blue hover:bg-sky-blue  p-2 rounded-t-lg border-primary-blue border-t-2 border-l-2 border-r-2 "
      }
    >
      {open ? (
        <span className="material-icons-outlined">remove</span>
      ) : (
        <span className="material-icons-outlined">add</span>
      )}
      {text}
    </button>
  );
};
export default AccountManagement;
