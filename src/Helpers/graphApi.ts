import { Auth } from "aws-amplify";
import axios, { AxiosResponse } from "axios";
import { HealthRegion, HealthRegionsByCountry, REstimate } from "Types";

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
          cumVaccFull
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

  getREstimate = async (params: REstimateParams): Promise<REstimate> => {
    const client = await this.init();
    return client
      .post("graphql", { query: rEstimateQuery, variables: params })
      .then((resp: AxiosResponse) => resp.data.data.rEstimate);
  };

  getHealthRegions = async (): Promise<HealthRegionsByCountry> => {
    const client = await this.init();
    const healthRegions = await client
      .post("graphql", { query: healthRegionQuery })
      .then(
        (resp: PaginatedGraphlQLResult<"allRegions", APIHealthRegion>) =>
          resp.data.data.allRegions.edges
      )
      .then((edges) => edges.map((edge) => edge.node));

    const result: HealthRegionsByCountry = {};
    healthRegions.forEach((region) => {
      if (!(region.country in result)) {
        result[region.country] = {};
      }
      const country = result[region.country];
      if (!(region.province in country)) {
        country[region.province] = [];
      }
      const province = country[region.province];
      province.push(region);
    });

    return result;
  };

  getRegionRankings = async (
    orderBy: RankingField,
    per100k: boolean,
    countries: string[] = ["Canada"]
  ): Promise<RankedRegion[]> => {
    const client = await this.init();
    return client
      .post("graphql", {
        query: regionRankingQuery,
        variables: { field: orderBy, per100k, countries: countries.join(",") },
      })
      .then(
        (response: GraphQLResult<"regionRanking", APIRegionRanking>) =>
          response.data.data.regionRanking.regions
      );
  };
}

interface RankedRegion {
  field: number;
  rank: number;
  province: string;
  healthRegion: string;
}
interface APIRegionRanking {
  regions: RankedRegion[];
}

// Health region data recieved from server
interface APIHealthRegion extends HealthRegion {
  country: string;
}
// https://stackoverflow.com/questions/56419558/typescript-how-to-use-a-generic-parameter-as-object-key
type GraphQLResult<QueryKey extends string, ResultType> = AxiosResponse<{
  data: {
    [key in QueryKey]: ResultType;
  };
}>;

interface GraphQLEdges<T> {
  edges: { node: T }[];
}

type PaginatedGraphlQLResult<QueryKey extends string, T> = GraphQLResult<
  QueryKey,
  GraphQLEdges<T>
>;

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
  $essentialRetailCap: Int!
  $worshipCap: Int!
  $masks: Boolean!
  $curfew: Boolean!
  $elementarySchools: Boolean!
  $secondarySchools: Boolean! 
) {
  rEstimate(
    healthRegion: $healthRegion
    province: $province
    date: $date
    restCap: $restCap
    gymCap: $gymCap
    retailCap: $retailCap
    essentialRetailCap: $essentialRetailCap
    worshipCap: $worshipCap
    masks: $masks
    curfew: $curfew
    elementarySchools: $elementarySchools
    secondarySchools: $secondarySchools
  ) {
    rV0
  }
}`;

const healthRegionQuery = `
{
  allRegions{
    edges{
      node{
        healthRegion,
        province,
        country
      }
    }
  }
}
`;

export type RankingField =
  | "activeCases"
  | "newCases"
  | "deaths"
  | "r0V0"
  | "resolutionTime"
  | "cumVaccFull";

const regionRankingQuery = `
query ($field: String!, $countries: String, $per100k: Boolean) {
  regionRanking(field: $field, countries: $countries, per100k: $per100k) {
    regions {
      field
      healthRegion
      rank
      province
    }
  }
}
`;
