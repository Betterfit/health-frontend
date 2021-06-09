import { useAuthStore } from "Context/authContext";
import TypedAPI from "Helpers/typedAPI";
import { convertFromSnake } from "Helpers/utils";
import { useQuery, UseQueryOptions } from "react-query";
import { UserProfile } from "Types";

export const userProfileQueryKey = "userProfile";

export const useUserProfile = (
  queryOptions: UseQueryOptions<UserProfile> = {}
) => {
  const authStore = useAuthStore() as any;
  return useQuery<UserProfile>("userProfile", getUserProfile, {
    placeholderData: convertFromSnake(authStore.user),
    staleTime: 1000 * 60 * 10,
    ...queryOptions,
  });
};

const getUserProfile = () =>
  api.getProfile().then((response) => {
    console.log(response);
    return response.data.user;
  });

const api = new TypedAPI();
