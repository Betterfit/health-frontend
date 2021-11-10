import axios, { AxiosInstance } from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { getIdToken } from "Helpers/cognito";
import {
  ConnectedAccount,
  Facility,
  Inventory,
  Order,
  OrderInvoice,
  Organization,
  Payment,
  PaymentMethod,
  ProductCategory,
  ProductOption,
  ProductPricing,
  ServerException,
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

    const client = applyCaseMiddleware(
      axios.create({
        baseURL: apiURL,
        timeout: 31000,
        headers: headers,
      })
    );
    // client.interceptors.response.use(undefined, (err: any) =>
    //   err?.response?.data?.code
    //     ? Promise.reject(new Error(err.response.data.code))
    //     : err
    // );
    return client;
  };
  // cleaner name
  getClient = async (): Promise<AxiosInstance> => {
    return this.init();
  };
  getUsers = async () => {
    const client = await this.init();
    return client.get<UserProfile[]>("/users/");
  };
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
  /** Checks that a user with the given email exists on our django backend */
  userExists = async (email: string) => {
    const client = await this.init(false);
    const response = await client.post<{ userExists: boolean }>(
      "/user-exists",
      { email }
    );
    return response.data.userExists;
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
    return client.post<Facility>("/facilities/", facilityData);
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
    orderId,
    action,
    data,
  }: UpdateOrderStatusProps) => {
    const client = await this.init();
    return client.post(`/orders/${orderId}/${action}`, data);
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

  createOrder = async (data: OrderMutationProps) => {
    const client = await this.init();
    return client
      .post<Order>(`/orders/`, data)
      .then((response) => response.data);
  };

  editOrder = async (id: number, data: OrderMutationProps) => {
    const client = await this.init();
    return client
      .patch<Order>(`/orders/${id}/`, data)
      .then((response) => response.data);
  };

  getOrderInvoice = async (orderId: number) => {
    const client = await this.init();
    return client
      .get<OrderInvoice>(`/orders/${orderId}/invoice`)
      .then((response) => response.data);
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

  getTransfer = async (ticketId: number) => {
    const client = await this.init();
    const response = await client.get<Transfer[]>(
      "/transfers" + buildQueryString({ ticketId })
    );
    return response.data[0];
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

  getTicket = async (ticketId: number) => {
    const client = await this.init();
    return client.get<SupplierTicket>("/tickets/" + ticketId);
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
    const queryString = buildQueryString({
      ...queryParams,
      // only show product options that are ready to be sold
      sellable: true,
    });
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

  //  ********** INVENTORY API **********
  getInventory = async (queryParams: {
    warehouse?: number;
    productOption?: number;
  }) => {
    const client = await this.init();
    const queryString = buildQueryString(queryParams);
    const response = await client.get<Inventory[]>("/inventory" + queryString);
    return response.data;
  };

  updateInventory = async (data: {
    warehouse: number;
    productOption: number;
    quantity: number;
  }) => {
    const client = await this.init();
    return client.post("/inventory/edit", data);
  };
}

export const api = new TypedAPI();

export type FacilityData = Omit<Facility, "pk" | "url" | "id" | "active">;

type UpdateOrderStatusProps = { orderId: number } & (
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

type OrderMutationProps = {
  facility: number;
  orderProducts?: {
    quantity: number;
    productOption: number;
    autoSelectSupplier?: boolean;
    pk?: number;
  }[];
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

export const parseException = (error: unknown): undefined | ServerException => {
  const exception = (error as any)?.response?.data;
  if (exception) return exception as ServerException | undefined;
};
