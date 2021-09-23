import axios, { AxiosInstance } from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { getIdToken } from "Helpers/cognito";
import {
  ConnectedAccount,
  Facility,
  Order,
  Organization,
  Payment,
  PaymentMethod,
  ProductCategory,
  ProductOption,
  ProductPricing,
  SupplierPricing,
  SupplierTicket,
  Transfer,
  UserProfile,
} from "Types";
import { buildQueryString } from "./utils";

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
  // cleaner name
  getClient = async (): Promise<AxiosInstance> => {
    return this.init();
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
    client.patch("/users/" + userId + "/", data);
  };

  //  ********** FACILITIES AND ORGANIZATION API **********
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
      isAdmin,
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
      isAdmin,
    });
  };
  //  ********** ORDER API **********
  getOrders = async (status = "") => {
    const client = await this.init();
    let path = "/orders";
    if (status) path += "?status=" + status;
    return client.get<Order[]>(path);
  };

  getOrder = async (id: number) => {
    const client = await this.init();
    const response = await client.get<Order>(`/orders/${id}`);
    return response.data;
  };

  updateOrderStatus = async ({
    order,
    action,
    data,
  }: UpdateOrderStatusProps) => {
    const client = await this.init();
    return client.post(order.url + "/" + action, data);
  };

  approveOrder = async ({
    order,
    data,
  }: {
    order: Order;
    data: {
      paymentMethodId: number;
      orderProducts: { id: number; supplierId: number; totalPrice: number }[];
    };
  }) => {
    const client = await this.init();
    return client.post(order.url + "/approve", { data });
  };

  cancelOrder = async (order: Order) => {
    const client = await this.init();
    return client.post(order.url + "/cancel");
  };

  //  ********** PRICING API **********
  /**
   * Used by purchasers to get price quotes/ranges
   */
  getPricing = async (
    orderProducts: {
      productOptionId: number;
      facilityId?: number;
      quantity?: number;
    }[]
  ) => {
    const client = await this.init();
    return client.post<ProductPricing[]>("/pricing/", orderProducts);
  };

  getSupplierPricing = async () => {
    const client = await this.init();
    return client.get<SupplierPricing[]>("/product-option-pricing");
  };

  addSupplierPricing = async (data: {
    productOption: number;
    price: number;
    currency: string;
  }) => {
    const client = await this.init();
    return client.post("/product-option-pricing", data);
  };

  updateSupplierPricing = async ({
    pricing,
    data,
  }: {
    pricing: SupplierPricing;
    data: { price: number; currency: string };
  }) => {
    const client = await this.init();
    return client.patch(pricing.url, data);
  };

  deleteSupplierPricing = async (pricing: SupplierPricing) => {
    const client = await this.init();
    return client.delete(pricing.url);
  };

  //  ********** PAYMENTS API **********

  getPaymentMethods = async () => {
    const client = await this.init();
    return client.get<PaymentMethod[]>("/payment-methods");
  };

  updatePaymentMethod = async (
    paymentMethod: PaymentMethod,
    data: PaymentMethodUpdate
  ) => {
    const client = await this.init();
    return client.patch(paymentMethod.url, data);
  };

  getConnectedAccounts = async () => {
    const client = await this.init();
    return client.get<ConnectedAccount[]>("/connected-accounts");
  };

  setupConnectedAccount = async () => {
    const client = await this.init();
    return client.post<{ url: string }>("/connected-accounts/setup");
  };

  completeConnectedAccountSetup = async () => {
    const client = await this.init();
    return client.post("/connected-accounts/setup-complete");
  };

  getPayments = async (queryParams?: {
    order?: number;
    paymentMethod?: number;
  }) => {
    const queryString = buildQueryString(queryParams);
    const client = await this.init();
    const response = await client.get<Payment[]>("/payments" + queryString);
    return response.data;
  };

  getTransfers = async () => {
    const client = await this.init();
    const response = await client.get<Transfer[]>("/transfers");
    return response.data;
  };

  /**
   * Used to get a client secrete needed to set up a payment method.
   * https://stripe.com/docs/payments/save-and-reuse?platform=web#web-create-setup-intent
   */
  getSetupPaymentIntent = async () => {
    const client = await this.init();
    return client.get<{ clientSecret: string }>("/users/payment-intent");
  };

  addPaymentMethod = async (data: NewPaymentMethodProps) => {
    const client = await this.init();
    return client.post("/payment-methods", data);
  };

  //  ********** TICKETS API **********
  getTickets = async () => {
    const client = await this.init();
    return client.get<SupplierTicket[]>("/tickets");
  };

  updateTicket = async (ticket: SupplierTicket, data: SupplierTicketUpdate) => {
    const client = await this.init();
    return client.patch(ticket.url, data);
  };

  //  ********** PRODUCTS API **********
  getCategories = async () => {
    const client = await this.init();
    const response = await client.get<ProductCategory[]>("/product-categories");
    return response.data;
  };

  getCategory = async (id: number) => {
    const client = await this.init();
    const response = await client.get<ProductCategory>(
      "/product-categories/" + id
    );
    return response.data;
  };

  getProductOptions = async (queryParams?: {
    category?: number;
    search?: string;
  }) => {
    const client = await this.init();
    const queryString = buildQueryString(queryParams);
    const response = await client.get<ProductOption[]>(
      "/product-options" + queryString
    );
    return response.data;
  };

  getProductOption = async (id: number) => {
    const client = await this.init();
    const response = await client.get<ProductOption>("/product-options/" + id);
    return response.data;
  };
}

export const api = new TypedAPI();

export type FacilityData = Omit<Facility, "pk" | "url" | "id">;

type UpdateOrderStatusProps = { order: Order } & (
  | { action: "cancel"; data?: undefined }
  | {
      action: "save-selections";
      data: { orderProductId: number; supplierId: number }[];
    }
  // need to include which suppliers were chosen for each OrderProduct
  | {
      action: "approve";
      data: {
        paymentMethodId: number;
        total: number;
      };
    }
);

type NewPaymentMethodProps = {
  owner: number;
  name: string;
  stripeId: string;
  // list of ids
  authorizedUsers: number[];
};

export type PaymentMethodUpdate = {
  authorizedUsers?: number[];
  owner?: number;
  disabled?: boolean;
};

export type SupplierTicketUpdate = {
  shippingProvider?: string;
  trackingNumber?: string;
  status: "shipped";
};
