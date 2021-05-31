import Api from "Helpers/api";
import { convertFromSnake } from "Helpers/utils";
import { useQuery } from "react-query";
import { Organization } from "Types";

export const organizationQueryKey = "organization";

export const useOrganization = () => {
  return useQuery<Organization>(["organization"], getMyOrganization);
};

const getMyOrganization = (): Promise<Organization> =>
  api
    .getMyOrganization()
    .then((organization) => convertFromSnake(organization));
const api = new Api();
