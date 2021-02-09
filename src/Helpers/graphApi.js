import { Auth } from "aws-amplify";
import * as axios from "axios";

const API_URL = process.env.REACT_APP_GRAPHQL_API_URL;
export default class GraphApi {
  constructor(filterString) {
    this.api_token = null;
    this.client = null;
    this.api_url = API_URL;
  }

  init = async () => {
    const session = await Auth.currentSession();
    const token = session.getIdToken().getJwtToken();
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
  getCaseData = async (filterString) => {
    let query = {
      query: `{allCases(${filterString}) 
      {  edges {    
        node {      
          reportedDate
          healthRegion {
            healthRegion
            province
            population2016
          } 
          cumRecoveredCases
          activeCases
          newCases
          deaths
          r0V0
          resolutionTime
          cumRecoveredCases
        }  
      }}}`,
      variables: null,
      operationName: null,
    };

    // parses through graphql cruft, which returns data inside deeply nested objects
    const client = await this.init();
    return client
      .post("graphql", query)
      .then((resp) => resp.data.data.allCases.edges)
      .then((edges) => edges.map((edge) => edge.node));
  };
}
