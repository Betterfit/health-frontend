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
  Product,
  ProductCategory,
  ProductOption,
  ServerException,
  Ticket,
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
    const response = await client.post<
      | { userExists: true; orgName: string }
      | { userExists: false; orgName: null }
    >("/user-exists", { email });
    return response.data;
  };

  //  ********** FACILITIES AND ORGANIZATION API **********
  registerPurchaser = async (data: {
    adminEmail: string;
    orgName: string;
    province: string;
  }) => {
    const client = await this.init(false);
    return client.post("/organizations/register-purchaser/", data);
  };

  getMyOrganization = async () => {
    const client = await this.init();
    return client.get<Organization>("/organizations/my_organization/");
  };

  updateOrganization = async (id: number, data: Partial<Organization>) => {
    const client = await this.getClient();
    return client.patch<Organization>("/organizations/" + id, data);
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
      .then((response) => response.data)
      .catch((error) => error.response.data);
  };

  markOrderProductDelivered = async (orderProductId: number) => {
    const client = await this.init();
    return client.post("/order-products/" + orderProductId + "/mark-delivered");
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
    return client.get<Ticket[]>("/tickets");
  };

  getTicket = async (ticketId: number) => {
    const client = await this.init();
    return client.get<Ticket>("/tickets/" + ticketId);
  };

  updateTicket = async (ticket: Ticket, data: SupplierTicketUpdate) => {
    const client = await this.init();
    return client.patch("/tickets/" + ticket.id, data);
  };

  //  ********** PRODUCTS API **********
  getCategories = async () => {
    const client = await this.init(false);
    const response = await client.get<ProductCategory[]>("/product-categories");
    return response.data;
  };

  getCategory = async (id: number) => {
    const client = await this.init(false);
    const response = await client.get<ProductCategory>(
      "/product-categories/" + id
    );
    return response.data;
  };

  getProductOptions = async (queryParams?: {
    category?: number;
    search?: string;
  }) => {
    const client = await this.init(false);
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
    const client = await this.init(false);
    const response = await client.get<ProductOption>("/product-options/" + id);
    return response.data;
  };

  updateProductOption = async (
    id: number,
    data: {
      price?: number;
      forSale?: boolean;
      freeShipping?: boolean;
      width?: number | null;
      height?: number | null;
      length?: number | null;
      sizeUnit?: "cm" | "in";
      weight?: number | null;
      weightUnit?: "kg" | "lb";
      carrier?: string | null;
      description?: string | "";
    }
  ) => {
    const client = await this.init();
    const response = await client.patch<ProductOption>(
      "/product-options/" + id,
      data
    );
    return response;
  };

  updateProduct = async (
    id: number,
    data: {
      description?: string | "";
    }
  ) => {
    const client = await this.init();
    const response = await client.patch<Product>("/products/" + id, data);

    return response;
  };

  uploadProductImage = async (
    data: { image: File } & ({ productOption: number } | { product: number })
  ) => {
    const client = await api.getClient();
    // uploading an image file requires us to use the form-data format
    const formData = new FormData();
    formData.append("image", data.image);
    if ("productOption" in data)
      formData.append("productOption", String(data.productOption));
    else formData.append("product", String(data.product));
    return client.post("/product-images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  deleteProductImage = async (id: number) => {
    const client = await api.getClient();
    return client.delete("/product-images/" + id);
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
