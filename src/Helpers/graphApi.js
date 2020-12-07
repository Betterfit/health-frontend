
import * as axios from "axios";

const API_URL  = process.env.REACT_APP_GRAPHQL_API_URL
export default class GraphApi {
  
  constructor(filterString) {
    this.api_token = null;
    this.client = null;
    this.api_url = API_URL;
  }

  init = () => {

    let headers = {
        'Content-Type': 'application/json',
    };

    if (this.api_token) {
        headers.Authorization = `Token ${this.api_token}`;
    }


    this.client = axios.create({
        baseURL: API_URL,
        timeout: 31000,
        headers: headers,
    });

    return this.client;
  };


  // get our case data based on init filter string
  getCaseData = (filterString) => {
    let query = {"query": `{allCases(${filterString}) 
      {  edges {    
        node {      
          reportedDate
          healthRegion {
            healthRegion
            province
          } 
          activeCases
          newCases
          deaths
        }  
      }}}`,"variables":null,"operationName":null}

    return this.init().post("graphql", query)
  };



}

