
import * as axios from "axios";
import Cookies from 'js-cookie'

export default class Api {
  constructor() {
    this.api_token = Cookies.get('token') ? Cookies.get('token') : null ;
    this.client = null;
    this.api_url = 'http://betterfit.l1f7.com'  
  }

  init = () => {

    let headers = {
        'Content-Type': 'application/json',
    };

    if (this.api_token) {
        console.log(this.api_token)
        headers.Authorization = `Token ${this.api_token}`;
    }

    console.log(headers);

    this.client = axios.create({
        mode: 'no-cors',
        baseURL: this.api_url,
        timeout: 31000,
        headers: headers,
    });

    return this.client;
  };

//   getUserList = (params) => {
//     return this.init().get("/users", { params: params });
//   };

  signIn = (data) => {
    return this.init().post("/api-token-auth/", data);
  }

  getProductCategories = () => {
    return this.init().get("/product-categories/"); 
  }
  getProduct = (id) => {
    return this.init().get(`/products/${id}`); 
  }
  getProductVariant = (id) => {
    return this.init().get(`/product-variations/${id}`); 
  }

  addNewUser = (data) => {
    return this.init().post("/users/", data);
  };

  //To request a password reset email
  passwordResetRequest = (data) => {
    //stub until relevent api can be included
    return this.init().post("api/password_reset/", data)
  }

}