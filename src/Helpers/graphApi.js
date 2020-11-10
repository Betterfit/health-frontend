
import * as axios from "axios";
import useStores from 'Helpers/useStores';
export default class GraphApi {

  
  constructor(filterString) {
    this.api_token = null;
    this.client = null;
    this.api_url = 'http://162.246.157.191:5000/';
  }

  init = () => {

    let headers = {
        'Content-Type': 'application/json',
    };

    if (this.api_token) {
        headers.Authorization = `Token ${this.api_token}`;
    }


    this.client = axios.create({
        baseURL: 'http://162.246.157.191:5000/' ,
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
    console.log(query);

    return this.init().post("graphql", query)
  };



}
