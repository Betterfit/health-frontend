import { Dialog } from "@material-ui/core";
import { mapFacilitiesById, useFacilities } from "APIHooks/facilities";
import {
  fullName,
  searchUsers,
  useMyProfile,
  userIsFacilityAdmin,
  userIsNormalMember,
  useUsers,
} from "APIHooks/user";
import IconButton from "Components/Content/IconButton";
import Title from "Components/Content/Title";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import SearchBar from "Components/Search/SearchBar";
import Tabs from "Components/Tabs/Tabs";
import TypedAPI from "Helpers/typedAPI";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { FacilityMembership, UserProfile } from "Types";
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
              key={category.key}
              title={category.heading}
              users={usersByType[category.key]}
              userType={category.key}
            />
          ))}
      </div>
    </div>
  );
};
const api = new TypedAPI();
const UserTypeList = ({
  userType,
  users,
  title,
}: {
  users: UserProfile[];
  title: string;
  userType: UserType;
}) => {
  const queryClient = useQueryClient();
  const facilitiesQuery = useFacilities();
  const facilitiesById = facilitiesQuery.isSuccess
    ? mapFacilitiesById(facilitiesQuery.data)
    : null;
  const myProfileQuery = useMyProfile();

  const [userToDelete, setUserToDelete] = useState<UserProfile | null>(null);
  const deleteUser = (user: UserProfile) => setUserToDelete(user);
  const confirmDeleteUser = async (user: UserProfile) => {
    const client = await api.init();
    client.delete(user.url).then(() => queryClient.invalidateQueries("users"));
    setUserToDelete(null);
  };

  const [userToEdit, setUserToEdit] = useState<UserProfile | null>(null);
  const deleteMembership = async (membership: FacilityMembership) => {
    const client = await api.init();
    client
      .delete(membership.url)
      .then(() => queryClient.invalidateQueries("users"));
  };
  let canMutateUsers = false;
  if (myProfileQuery.isSuccess) {
    const user = myProfileQuery.data;
    // organization admin can update other users
    if (user.isOrganizationAdmin && userType !== "organizationAdmins")
      canMutateUsers = true;
    // facility admin can only update members
    else if (userIsFacilityAdmin(user) && userType === "members")
      canMutateUsers = true;
  }

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
            users.map((user, i) => (
              <tr key={i}>
                <td>{user.email}</td>
                <td>{fullName(user)}</td>
                <td>
                  {user.facilityMembership.map((membership, i) => (
                    //   flex is required so that the delete icons line up
                    <div key={i} className="flex items-center">
                      {facilitiesById &&
                        facilitiesById[membership.facilityId].name}
                      {user.id === userToEdit?.id && (
                        <IconButton
                          color="red"
                          iconName="close"
                          onClick={() => deleteMembership(membership)}
                        />
                      )}
                    </div>
                  ))}
                </td>
                <td className={styles.actions}>
                  {canMutateUsers && (
                    <>
                      <IconButton
                        color="blue"
                        iconName="edit"
                        onClick={() =>
                          user.id === userToEdit?.id
                            ? setUserToEdit(null)
                            : setUserToEdit(user)
                        }
                      />
                      <IconButton
                        color="red"
                        iconName="delete"
                        onClick={() => deleteUser(user)}
                      />
                    </>
                  )}
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
      {userToDelete && (
        <Dialog onClose={() => setUserToDelete(null)} open={true}>
          <div className={styles.deleteDialog}>
            <div className={styles.dialogContent}>
              <p>Are you sure you want to delete this user?</p>
              <p>{"Email: " + userToDelete.email}</p>
              {userToDelete.firstName && (
                <p>{"Name: " + fullName(userToDelete)}</p>
              )}
            </div>
            <div className={styles.actionButtons}>
              <PrettyButton
                text="Cancel"
                onClick={() => {
                  setUserToDelete(null);
                }}
              />

              <PrettyButton
                text="Delete"
                color="red"
                onClick={() => {
                  confirmDeleteUser(userToDelete);
                  setUserToDelete(null);
                }}
              />
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default UserTable;
