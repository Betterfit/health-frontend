
import * as axios from "axios";
import { useCookies } from 'react-cookie';

export default class Api {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = 'http://betterfit.l1f7.com/'
  }

  init = () => {
    this.api_token = null;

    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    };

    if (this.api_token) {
      headers.Authorization = `Bearer ${this.api_token}`;
    }

    this.client = axios.create({
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
    return this.init().post("api-token-auth/", data);
  }

  addNewUser = (data) => {
    return this.init().post("/users", data);
  };

}