import axios, { AxiosInstance } from "axios";
import { getIdToken } from "Helpers/cognito";

export const apiURL = process.env.REACT_APP_DJANGO_API_URL;
export default class typedAPI {
  client: AxiosInstance | undefined;
  init = async (requireAuth = true) => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: requireAuth && `Bearer ${await getIdToken()}`,
    };

    return axios.create({
      baseURL: apiURL,
      timeout: 31000,
      headers: headers,
    });
  };

  getProfile = async () => {
    const client = await this.init();
    return client.get("/me/");
  };

  // organization
  getMyOrganization = async () => {
    const client = await this.init();
    return client.get("/organizations/my_organization/");
  };
}
