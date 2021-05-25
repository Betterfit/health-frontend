import * as axios from "axios";
import { getIdToken } from "Helpers/cognito";

export const apiURL = process.env.REACT_APP_DJANGO_API_URL;
export default class Api {
  constructor() {
    this.client = null;
    this.api_url = apiURL;
  }

  init = async (requireAuth = true) => {
    let headers = {
      "Content-Type": "application/json",
    };

    if (requireAuth) {
      const token = await getIdToken();

      headers.Authorization = `Bearer ${token}`;
    }

    this.client = axios.create({
      baseURL: apiURL,
      timeout: 31000,
      headers: headers,
    });
    return this.client;
  };

  // ============================   AUTH API  =====================================

  addNewUser = async (data) => {
    const client = await this.init();
    return client.post("/users/", data);
  };

  //To request a password reset email
  passwordResetRequest = async (data) => {
    //stub until relevent api can be included
    const client = await this.init();
    return client.post("/api/password_reset/", data);
  };

  getProfile = async () => {
    const client = await this.init();
    return client.get("/me/");
  };

  getUserData = async (data) => {
    const client = await this.init();
    return client.post("/api-token-auth/", data);
  };

  getUser = async (id) => {
    const client = await this.init();
    return client.get(`/users/${id}/`);
  };

  getFacilityData = async (id) => {
    const client = await this.init();
    return client.get(`/facilities/${id}`);
  };

  changePassword = async (data) => {
    const client = await this.init();
    return client.put(`/change-password/`, data);
  };

  changeProfile = async (id, data) => {
    const client = await this.init();
    return client.patch(`/users/${id}/`, data);
  };

  // ============================   PRODUCTS API  =====================================
  getProductCategories = async () => {
    const client = await this.init();
    return client.get(`/product-categories/`);
  };

  getCategoriesBySupplier = async (supplierid) => {
    const client = await this.init();
    return client.get(`/product-categories/?supplier=${supplierid}`);
  };

  getProductsBySupplier = async (productid) => {
    const client = await this.init();
    return client.get(`products/${productid}/`);
  };

  getProductBySupplier = async (supplierid, productid) => {
    const client = await this.init();
    return client.get(`/products/${productid}/?supplier=${supplierid}`);
  };

  //get products under a particular category id
  getCategory = async (id) => {
    const client = await this.init();
    return client.get(`/product-categories/${id}/`);
  };

  getProduct = async (id) => {
    const client = await this.init();
    return client.get(`/products/${id}/`);
  };
  getProductVariant = async (id) => {
    const client = await this.init();
    return client.get(`/product-variations/${id}`);
  };
  getSearchResults = async (query) => {
    const client = await this.init();
    return client.get(`/product-categories/?q=${query}`);
  };

  getSupplierSearchResults = async (query, id) => {
    const client = await this.init();
    return client.get(`/product-categories/?q=${query}&supplier=${id}`);
  };

  getProductOption = async (id) => {
    const client = await this.init();
    return client.get(`/product-options/${id}/`);
  };

  updateSupplierProductQuantity = async (userId, id, data) => {
    let quantity = { quantity: data };
    const client = await this.init();
    return client.put(`/suppliers/${userId}/product-options/${id}/`, quantity);
  };

  getSupplierProductQuantity = async (userId, id) => {
    const client = await this.init();
    return client.get(`/suppliers/${userId}/product-options/${id}/`);
  };

  getProductOptionsSearch = async (catId, query) => {
    const client = await this.init();
    return client.get(`/product-options/?search=${query}&category=${catId}`);
  };

  // ============================   TICKETS API  =====================================

  getSupplierTickets = async (userId) => {
    const client = await this.init();
    return client.get(`/suppliers/${userId}/tickets/`);
  };

  getSupplierTicketOrder = async (userId, id) => {
    const client = await this.init();
    return client.get(`/suppliers/${userId}/tickets/${id}/`);
  };

  setUpdateTicket = async (userId, id, data) => {
    const client = await this.init();
    return client.put(`/suppliers/${userId}/tickets/${id}/`, data);
  };

  getSearchTickets = async (supplierId, query) => {
    const client = await this.init();
    return client.get(`/suppliers/${supplierId}/tickets/?search=${query}`);
  };

  // ============================   ORDERS API  =====================================

  getOrderList = async (facilityId) => {
    const client = await this.init();
    return client.get(`/facilities/${facilityId}/orders/`);
  };

  getOrder = async (orderId) => {
    const client = await this.init();
    return client.get(`/orders/${orderId}/`);
  };

  getAllOrders = async (orderId) => {
    const client = await this.init();
    return client.get(`/orders/`);
  };

  getSearchOrders = async (query) => {
    const client = await this.init();
    return client.get(`/orders/?search=${query}/`);
  };

  //to cancel an order - change to 'cancelled' status
  // data - should be json of {order_no:[######], status:"open"}
  deleteOrder = async (orderId, orderNo) => {
    let data = { status: "cancelled", order_no: orderNo };
    const client = await this.init();
    return client.put(`/orders/${orderId}/`, data);
  };

  //to submit a draft - change to 'open' status
  // data - should be json of {order_no:[######], status:"open"}
  submitDraft = async (orderId, orderNo) => {
    let data = { status: "open", order_no: orderNo };
    const client = await this.init();
    return client.put(`/orders/${orderId}/`, data);
  };

  getTrafficControllerSupply = async () => {
    const client = await this.init();
    return client.get(`/traffic-controllers/product-categories/`);
  };

  setNewOrder = async (order) => {
    const client = await this.init();
    return client.post(`/orders/`, order);
  };

  editOrder = async (order, id) => {
    console.log(order);
    const client = await this.init();
    return client.patch(`/orders/${id}/`, order);
  };

  // ============================   RESOURCES API  =====================================
  getResources = async (searchQuery = "") => {
    const client = await this.init();
    if (searchQuery !== "")
      return client.get(`/resources?search=${searchQuery}`);
    return client.get(`/resources/`);
  };

  getTags = async () => {
    const client = await this.init();
    return client.get(`/tags/`);
  };

  // ============================  MATCHES API  =====================================

  getMatchHistory = async () => {
    const client = await this.init();
    return client.get(`/matches/history/`);
  };
  getMatchHistoryDate = async (date) => {
    const client = await this.init();
    return client.get(`/matches/history?date=${date}`);
  };
  getMatches = async () => {
    const client = await this.init();
    return client.get("/matches/");
  };
  postSortedMatches = async (orders) => {
    const client = await this.init();
    return client.post("/match-orders/", orders);
  };
}
