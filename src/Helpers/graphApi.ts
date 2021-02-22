import { Auth } from "aws-amplify";
import axios, { AxiosResponse } from "axios";
import { REstimate } from "Types";

const API_URL = process.env.REACT_APP_GRAPHQL_API_URL;
export default class GraphApi {

  init = async () => {
    const session = await Auth.currentSession();
    const token = session.getIdToken().getJwtToken();
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };


    return axios.create({
      baseURL: API_URL,
      timeout: 31000,
      headers: headers,
    });
  };

  // get our case data based on init filter string
  getCaseData = async (filterString: string) => {
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
      .then((resp: AxiosResponse) => resp.data.data.allCases.edges)
      .then((edges: any) => edges.map((edge: any) => edge.node));
  };

  getREstimate = async (params: REstimateParams) : Promise<REstimate> => {
    const client = await this.init();
    return client
      .post("graphql", { query: rEstimateQuery, variables: params })
      .then((resp: AxiosResponse) => resp.data.data.rEstimate);
  };
}

interface REstimateParams {
  healthRegion: string;
  province: string;
  date: string;
  restCap: number;
  gymCap: number;
  retailCap: number;
  worshipCap: number;
  masks: boolean;
  curfew: boolean;
}

const rEstimateQuery = `query(
  $healthRegion: String!
  $province: String!
  $date: Date!
  $restCap: Int!
  $gymCap: Int!
  $retailCap: Int!
  $worshipCap: Int!
  $masks: Boolean!
  $curfew: Boolean!
) {
  rEstimate(
    healthRegion: $healthRegion
    province: $province
    date: $date
    restCap: $restCap
    gymCap: $gymCap
    retailCap: $retailCap
    worshipCap: $worshipCap
    masks: $masks
    curfew: $curfew
  ) {
    rV0
  }
}`;
