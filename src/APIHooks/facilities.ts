import TypedAPI from "Helpers/typedAPI";
import { useQuery } from "react-query";
import { Facility } from "Types";

export const facilitiesQK = "facilities";

export const useUserFacilities = () => {
  return useQuery<Facility[]>(
    facilitiesQK,
    () => api.getMyFacilities().then((response) => response.data),
    {
      // query is considered fresh for ten minutes
      staleTime: 1000 * 60 * 10,
    }
  );
};

const api = new TypedAPI();
