import { api } from "Helpers/typedAPI";
import { useQuery, UseQueryOptions } from "react-query";
import { Inventory } from "Types";

export const useInventory = (
  filters: {
    /** Only show inventory for the warehouse with this id */
    warehouse?: number;
    /** Only show inventory for this product */
    productOption?: number;
  },
  queryOptions: UseQueryOptions<Inventory[]> = {}
) => {
  return useQuery(["inventory", filters], () => api.getInventory(filters), {
    ...queryOptions,
  });
};
