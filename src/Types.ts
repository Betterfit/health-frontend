import { Moment } from "moment";

export interface Tag {
    pk: number;
    title: string;
    main_color: string;
    background_color: string;
}

export interface ResourceDetails {
    biosafety_level: number;
    city: string;
    email: string;
    phone_number: string;
    postal_code: string;
    street: string;
    province: string;
    website: string;
    description: string;
    main_contact: string;
    fax: string;
}


export interface Resource {
    pk: number;
    resource_type: string;
    tags: Tag[];
    details: ResourceDetails;
    title: string;
    color: string;
}

export interface GraphQLRegionDay {

}

export interface RegionDay {
    activeCases: number;
    recoveredCases: number;
    newCases: number;
    deaths: number;
    reportedDate: string;
    healthRegion: HealthRegion
}

export interface HealthRegion {
    healthRegion: string;
    province: string;
    population2016: number;
    populationDensityPerSqkm?: number;
}

export interface NationalCovidTimeSeries {
    [province: string]: ProvincialCovidTimeSeries;
}

export interface ProvincialCovidTimeSeries {
    [healthRegion: string]: RegionalCovidTimeSeries
}

export interface RegionalCovidTimeSeries {
    population: number;
    activeCases: number[];
    newCases: number[];
    deaths: number[];
}