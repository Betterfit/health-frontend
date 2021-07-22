import TypedAPI from "Helpers/typedAPI";
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { Facility, User, UserProfile } from "Types";
import { mapFacilitiesById } from "./facilities";

export const userProfileQueryKey = "userProfile";

export const useMyProfile = (
  queryOptions: UseQueryOptions<UserProfile> = {}
) => {
  const queryClient = useQueryClient();
  const data = useQuery<UserProfile>(userProfileQueryKey, getMyProfile, {
    staleTime: 1000 * 60 * 10,
    ...queryOptions,
  });
  const invalidate = () => queryClient.invalidateQueries(userProfileQueryKey);
  return { ...data, invalidate };
};

// export const useProfileCreationMutation = (props: UseMutationOptions) => {
//     return useMutation((data: {}))
// }

const api = new TypedAPI();
const getMyProfile = () =>
  api.getProfile().then((response) => {
    console.log(response);
    return response.data.user;
  });

export const useUsers = () => {
  const query = useQuery<UserProfile[]>("users", () =>
    api.getUsers().then((response) => response.data)
  );
  return {
    ...query,
  };
};

export type UsersByFacility = Record<string, Set<string>>;
/**
 * Groups users by facility.
 * Returns a dictionary that maps facility id to set of emails of users that belong to that facility
 */
export const groupUsersByFacility = (users: UserProfile[]): UsersByFacility => {
  const result: UsersByFacility = {};
  for (const user of users) {
    for (const { facility } of user.facilityMembership) {
      if (!(facility in result)) result[facility] = new Set();
      result[facility].add(user.email);
    }
  }
  return result;
};

export const fullName = (user: User | undefined | null): string =>
  [user?.firstName, user?.lastName].join(" ");

/**
 *
 * @param users A list of users to filter
 * @param searchQuery A string to match users against
 * @param facilities If supplied, will also match against facilities that the user belongs to
 * @returns A filtered list of users whbse email, full name match the search query
 */
export const searchUsers = (
  users: UserProfile[],
  searchQuery: string,
  facilities?: Facility[]
): UserProfile[] => {
  if (searchQuery === "") return users;
  let facilitiesById = facilities ? mapFacilitiesById(facilities) : {};
  searchQuery = searchQuery.toLowerCase();
  return users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchQuery) ||
      fullName(user).toLowerCase().includes(searchQuery) ||
      (facilities &&
        user.facilityMembership.some((membership) =>
          facilitiesById[membership.facilityId].name
            .toLowerCase()
            .includes(searchQuery)
        ))
  );
};

export const userIsFacilityAdmin = (user: UserProfile) =>
  !user.isOrganizationAdmin &&
  user.facilityMembership.some((membership) => membership.isAdmin);

export const userIsNormalMember = (user: UserProfile) =>
  !user.isOrganizationAdmin &&
  user.facilityMembership.every((membership) => !membership.isAdmin);

//   export const userIsAdminOf = (admin: UserProfile, member: UserProfile) => {
//      if (member.isOrganizationAdmin)
//         return false
//     if(admin.facilityMembership.some())
//   }
