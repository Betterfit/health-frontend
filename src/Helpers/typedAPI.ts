import axios, { AxiosInstance } from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { getIdToken } from "Helpers/cognito";
import { Facility, Organization, UserProfile } from "Types";

export const apiURL = process.env.REACT_APP_DJANGO_API_URL;
export default class TypedAPI {
  client: AxiosInstance | undefined;
  init = async (requireAuth = true) => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: requireAuth && `Bearer ${await getIdToken()}`,
    };

    return applyCaseMiddleware(
      axios.create({
        baseURL: apiURL,
        timeout: 31000,
        headers: headers,
      })
    );
  };
  getUsers = async () => {
    const client = await this.init();
    return client.get<UserProfile[]>("/users/");
  };
  // repeat in the non typed api, this one converts to camel case
  getProfile = async () => {
    const client = await this.init();
    return client.get<{ user: UserProfile }>("/me/");
  };
  completeProfile = async (
    userId: number,
    data: { firstName: string; lastName: string }
  ) => {
    const client = await this.init();
    client.patch("/users/" + userId, data);
  };

  // organization
  getMyOrganization = async () => {
    const client = await this.init();
    return client.get<Organization>("/organizations/my_organization/");
  };

  getFacilitiesInMyOrganization = async () => {
    const client = await this.init();
    return client.get<Facility[]>("/facilities/");
  };
  getMyFacilities = async () => {
    const client = await this.init();
    return client.get<Facility[]>("/facilities/my_facilities/");
  };

  createFacility = async (facilityData: FacilityData) => {
    const client = await this.init();
    return client.post("/facilities/", facilityData);
  };

  addExistingUserToFacility = async (
    userURL: string,
    facilityURL: string,
    isAdmin: boolean
  ) => {
    const client = await this.init();
    return client.post("/facility-members/", {
      user: userURL,
      facility: facilityURL,
    });
  };

  addNewUserToFacility = async (
    email: string,
    facilityId: number,
    isAdmin: boolean
  ) => {
    const client = await this.init();
    return client.post("/facility-members/new_user/", {
      email,
      facilityId,
    });
  };
}

export type FacilityData = Omit<Facility, "pk" | "url" | "id">;
