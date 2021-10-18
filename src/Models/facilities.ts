import TypedAPI from "Helpers/typedAPI";
import { useQuery, UseQueryOptions } from "react-query";
import { preferencesActions } from "Store/preferencesSlice";
import { useAppDispatch, useAppSelector } from "Store/store";
import { Facility } from "Types";

export const facilitiesQK = "facilities";

/**
 * Facilities that the user is a member of or has admin access to
 */
export const useUserFacilities = (
  queryOptions?: UseQueryOptions<Facility[]>
) => {
  return useQuery<Facility[]>(
    facilitiesQK,
    () => api.getMyFacilities().then((response) => response.data),
    {
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

/**
 * Returns the currently selected facility, along with a function to update it.
 * Currently just selects the first facility facility that the user has access to.
 */
export const useSelectedFacility = () => {
  const dispatch = useAppDispatch();
  const setSelectedFacility = (facility: Facility) => {
    dispatch(preferencesActions.setFacilityId(facility.id));
  };
  const facilityId = useAppSelector((state) => state.preferences.facilityId);
  const { data: facilities } = useUserFacilities();
  const facility =
    facilities && facilities.length > 0
      ? facilities.find((facility) => facility.id === facilityId)
      : undefined;
  // eventually we'll make this global with context
  return {
    facility,
    facilityId,
    setSelectedFacility,
  };
};
const api = new TypedAPI();
