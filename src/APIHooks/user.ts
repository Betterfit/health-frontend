import { useAuthStore } from "Context/authContext";
import Api from "Helpers/api";
import { convertFromSnake } from "Helpers/utils";
import { useQuery, UseQueryOptions } from "react-query";
import { UserProfile } from "Types";

export const userProfileQueryKey = "userProfile";
export interface UserProfileHookProps {
  queryOptions: UseQueryOptions<UserProfile>;
}
export const useUserProfile = ({ queryOptions }: UserProfileHookProps) => {
  const authStore = useAuthStore() as any;
  return useQuery<UserProfile>("userProfile", getUserProfile, {
    placeholderData: authStore.user,
    ...queryOptions,
  });
};

const getUserProfile = (): Promise<UserProfile> =>
  api.getProfile().then((profile) => convertFromSnake(profile.user));

const api = new Api();
