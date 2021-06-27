import TypedAPI from "Helpers/typedAPI";
import { useQuery, UseQueryOptions } from "react-query";
import { Facility } from "Types";
import { defaultQueryOptions } from "./utils";

export const facilitiesQK = "facilities";

/**
 * Facilities that the member of or has admin access to
 */
export const useUserFacilities = (
  queryOptions?: UseQueryOptions<Facility[]>
) => {
  return useQuery<Facility[]>(
    facilitiesQK,
    () => api.getMyFacilities().then((response) => response.data),
    {
      ...defaultQueryOptions,
      ...queryOptions,
    }
  );
};

/**
 * All facilities in the users organization
 */
export const useFacilities = (queryOptions?: UseQueryOptions<Facility[]>) => {
  return useQuery<Facility[]>(
    facilitiesQK,
    () => api.getFacilitiesInMyOrganization().then((response) => response.data),
    {
      ...defaultQueryOptions,
      ...queryOptions,
    }
  );
};

export const mapFacilitiesById = (
  facilities: Facility[]
): Record<number, Facility> => {
  const facilitiesById = {} as Record<number, Facility>;
  facilities.forEach((facility) => (facilitiesById[facility.id] = facility));
  return facilitiesById;
};

const api = new TypedAPI();
