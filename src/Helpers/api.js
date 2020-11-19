import * as axios from "axios";
import useStores from 'Helpers/useStores';
export default class Api {

  constructor() {
    this.api_token = localStorage.getItem('token');
    this.client = null;
    this.api_url = 'http://betterfit.l1f7.com/'  
  }

  init = () => {

    let headers = {
        'Content-Type': 'application/json',
    };

    if (this.api_token) {
        headers.Authorization = `Token ${this.api_token}`;
    }


    this.client = axios.create({
        baseURL: 'http://betterfit.l1f7.com/' ,
        timeout: 31000,
        headers: headers,
    });

    return this.client;
  };


  // ============================   AUTH API  =====================================

  addNewUser = (data) => {
    return this.init().post("users/", data);
  };

  //To request a password reset email
  passwordResetRequest = (data) => {
    //stub until relevent api can be included
    return this.init().post("api/password_reset/", data)
  }

  signIn = (data) => {
    return this.init().post("api-token-auth/", data);
  }

  getUserData = (data) => {
    return this.init().post("api-token-auth/", data);
  }

  getUser = (id) => {
    return this.init().get(`users/${id}/`);
  }

  getFacilityData = (id) => {
    return this.init().get(`facilities/${id}`);
  }

  changePassword = (data) => {
    return this.init().put(`change-password/`, data); 
  }

  changeProfile = (id, data) => {
    return this.init().patch(`users/${id}/`, data); 
  }


// ============================   PRODUCTS API  =====================================
  getProductCategories = () => {
    return this.init().get(`product-categories` ); 
  }

  getCategoriesBySupplier = (supplierid) => {
    return this.init().get(`product-categories/?supplier=${supplierid}` ); 
  }

  getProductsbySupplier = (supplierid) => {
    return this.init().get(`products/?supplier=${supplierid}`); 
  }

  //get products under a particular category id
  getCategory = (id) => {
    return this.init().get(`product-categories/${id}`); 
  }
  
  getProduct = (id) => {
    return this.init().get(`products/${id}`); 
  }
  getProductVariant = (id) => {
    return this.init().get(`product-variations/${id}`); 
  }
  getSearchResults = (query) => {
    return this.init().get(`product-categories/?q=${query}`)
  }

  getProductOption = (id) => {
    return this.init().get(`/product-options/${id}`)
  }

  updateSupplierProductQuantity = (userId,id,data) => {
    let quantity = {"quantity":data}
    return this.init().put(`/suppliers/${userId}/product-options/${id}/`, quantity)
  }

  getSupplierProductQuantity = (userId,id) => {
    return this.init().get(`/suppliers/${userId}/product-options/${id}/`)
  }
  // ============================   TICKETS API  =====================================

  getSupplierTickets = (userId) => {
    return this.init().get(`/suppliers/${userId}/tickets/`)
  }

  getSupplierTicketOrder = (userId,id) => {
    return this.init().get(`/suppliers/${userId}/tickets/${id}`)
  }

  setUpdateTicket = (userId,id,data) => {
    return this.init().put(`/suppliers/${userId}/tickets/${id}`,data)
  }

  getSearchTickets = (supplierId,query) => {
    return this.init().get(`/suppliers/${supplierId}/tickets/?search=${query}`)
  }

  // ============================   ORDERS API  =====================================

  getOrderList = (facilityId) => {
    return this.init().get(`/facilities/${facilityId}/orders/`)
  }

  getOrder = (orderId) => {
    return this.init().get(`/orders/${orderId}`)
  }

  getSearchOrders = (query) => {
    return this.init().get(`orders/?search=${query}`);
  }

  //to cancel an order - change to 'cancelled' status
  // data - should be json of {order_no:[######], status:"open"}
  deleteOrder = (orderId, orderNo) => {
    let data = { status: "cancelled", order_no: orderNo };
    return this.init().put(`/orders/${orderId}/`, data)
  }
  
  //to submit a draft - change to 'open' status
  // data - should be json of {order_no:[######], status:"open"}
  submitDraft = (orderId, orderNo) => {
    let data = { status: "open", order_no: orderNo };
    return this.init().put(`/orders/${orderId}/`, data)
  }

  getTrafficControllerSupply = () => {
    return this.init().get(`/traffic-controllers/product-categories/`)
  }

  setNewOrder = (order) => {
    return this.init().post(`/orders/`,order)
  }

  editOrder = (order,id) => {
    return this.init().patch(`/orders/${id}/`,order)
  }

  // ============================   RESOURCES API  =====================================
  getResources = () => {
    return this.init().get(`/resources/`); 
  }

  getTags = () => {
    return this.init().get(`/tags/`); 
  }

  // ============================  MATCHES API  =====================================

  getMatchHistory = () => {
    return this.init().get(`/matches/history/`); 
  }
  getMatches = () => {
    return this.init().get('/matches/');
  }
  postSortedMatches = (orders) => {
    return this.init().post('/match-orders/',orders);
  }
}

