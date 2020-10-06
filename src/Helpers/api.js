
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

//   getUserList = (params) => {
//     return this.init().get("/users", { params: params });
//   };

  signIn = (data) => {
    return this.init().post("api-token-auth/", data);
  }

  getProductCategories = () => {
    return this.init().get("product-categories/"); 
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

  addNewUser = (data) => {
    return this.init().post("users/", data);
  };

}