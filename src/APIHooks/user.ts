import { useAuthStore } from "Context/authContext";
import TypedAPI from "Helpers/typedAPI";
import { convertFromSnake } from "Helpers/utils";
import { useQuery, UseQueryOptions } from "react-query";
import { UserProfile } from "Types";

export const userProfileQueryKey = "userProfile";

export const useMyProfile = (
  queryOptions: UseQueryOptions<UserProfile> = {}
) => {
  const authStore = useAuthStore() as any;
  return useQuery<UserProfile>(userProfileQueryKey, getMyProfile, {
    placeholderData: convertFromSnake(authStore.user),
    staleTime: 1000 * 60 * 10,
    ...queryOptions,
  });
};

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

const api = new TypedAPI();
