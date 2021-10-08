import { api } from "Helpers/typedAPI";
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { Order, UserProfile } from "Types";

export const useOrder = (id: number, queryOptions?: UseQueryOptions<Order>) => {
  const queryClient = useQueryClient();
  return useQuery<Order>(["orders", { id }], () => api.getOrder(id), {
    // search through cached orders first to avoid sending a request
    // https://react-query.tanstack.com/guides/initial-query-data#initial-data-from-cache
    initialData: () => {
      const cache = queryClient.getQueryData("orders") as Order[] | undefined;
      return cache?.find((order) => order.id === id);
    },
    ...queryOptions,
  });
};

export const orderCanBeEdited = (order: Order, userProfile: UserProfile) => {
  if (order.status !== "open" && order.status !== "draft") return false;
  if (order.authorUser.id === userProfile.id) return true;
  // administrators can update orders (if they have authority over that facility)
  return (
    userProfile.isOrganizationAdmin ||
    userProfile.facilityMembership.some(
      (membership) =>
        membership.facilityId === order.facility.id && membership.isAdmin
    )
  );
};
