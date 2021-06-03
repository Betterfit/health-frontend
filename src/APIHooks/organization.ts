import typedAPI from "Helpers/typedAPI";
import { convertFromSnake } from "Helpers/utils";
import { useQuery } from "react-query";
import { Organization } from "Types";

export const organizationQueryKey = "organization";

export const useOrganization = () => {
  return useQuery<Organization>(["organization"], getMyOrganization, {
    // query is considered fresh for ten minutes
    staleTime: 1000 * 60 * 10,
  });
};

const getMyOrganization = (): Promise<Organization> =>
  api.getMyOrganization().then((response) => convertFromSnake(response.data));
const api = new typedAPI();
