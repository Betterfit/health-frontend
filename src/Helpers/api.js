
import * as axios from "axios";
import Cookies from 'js-cookie'

export default class Api {
  constructor() {
    this.api_token = Cookies.get('token') ? Cookies.get('token') : null ;
    this.client = null;
    this.api_url = 'http://betterfit.l1f7.com/'  
  }

  init = () => {

    let headers = {
        'Content-Type': 'application/json',
    };

    if (this.api_token) {
        // console.log(this.api_token)
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


// ============================   PRODUCTS API  =====================================
  getProductCategories = () => {
    return this.init().get("product-categories/"); 
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

  // ============================   TICKETS API  =====================================

  getSupplierTickets = () => {
    return this.init().get(`/suppliers/1/tickets/`)
  }

  getSupplierTicketOrder = (id) => {
    return this.init().get(`/suppliers/1/tickets/${id}`)
  }

  setUpdateOrder = (id,data) => {
    return this.init().post(`/orders/${id}`,data)
  }

}

