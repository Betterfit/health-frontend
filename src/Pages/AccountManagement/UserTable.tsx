import { mapFacilitiesById, useFacilities } from "APIHooks/facilities";
import {
  fullName,
  searchUsers,
  userIsFacilityAdmin,
  userIsNormalMember,
  useUsers,
} from "APIHooks/user";
import IconButton from "Components/Content/IconButton";
import Title from "Components/Content/Title";
import SearchBar from "Components/Search/SearchBar";
import Tabs from "Components/Tabs/Tabs";
import React, { useState } from "react";
import { UserProfile } from "Types";
import styles from "./UserTable.module.css";

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
  const [searchText, setSearchText] = useState("");
  const usersQuery = useUsers();
  const facilitiesQuery = useFacilities();
  let users = usersQuery.isSuccess ? usersQuery.data : [];
  users = searchUsers(users, searchText, facilitiesQuery.data);
  const organizationAdmins = users.filter((user) => user.isOrganizationAdmin);
  const facilityAdmins = users.filter(userIsFacilityAdmin);
  const members = users.filter(userIsNormalMember);
  const usersByType = {
    allUsers: users,
    organizationAdmins,
    facilityAdmins,
    members,
  };
  const searchBar = (
    <SearchBar
      key="userSearch"
      performSearch={setSearchText}
      placeholderText="Search users"
      startingText={searchText}
      // only perform search after the user has stopped typing for 100ms
      msDelay={100}
    />
  );
  return (
    <div className={styles.users}>
      <Title text="Users" />
      <Tabs
        key="userTabs"
        tabs={userCategories.map((category) => ({
          ...category,
          amount: usersByType[category.key].length,
        }))}
        amount
        tabCallBack={(key) => setUserType(key as UserType)}
        headingComp={searchBar}
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
  const facilitiesQuery = useFacilities();
  const facilitiesById = facilitiesQuery.isSuccess
    ? mapFacilitiesById(facilitiesQuery.data)
    : null;
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
          {users.length > 0 ? (
            users.map((user) => (
              <tr>
                <td>{user.email}</td>
                <td>{fullName(user)}</td>
                <td>
                  {user.facilityMembership.map((membership) => (
                    <tr>
                      {facilitiesById &&
                        facilitiesById[membership.facilityId].name}
                    </tr>
                  ))}
                </td>
                <td className={styles.actions}>
                  <IconButton color="blue" iconName="edit" />
                  <IconButton color="red" iconName="delete" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className={styles.emptyTable}>
                No users
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
