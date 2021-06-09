import TypedAPI from "Helpers/typedAPI";
import { useQuery } from "react-query";
import { Organization } from "Types";

export const organizationQueryKey = "organization";

export const useOrganization = () => {
  return useQuery<Organization>(["organization"], getMyOrganization, {
    // query is considered fresh for ten minutes
    staleTime: 1000 * 60 * 10,
  });
};

const getMyOrganization = () =>
  api.getMyOrganization().then((response) => response.data);
const api = new TypedAPI();
