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

export interface RegionDay {
    activeCases: number;
    recoveredCases: number;
    newCases: number;
    deaths: number;
    resolutionTime: number;
    r0V0: number;
    reportedDate: string;
    healthRegion: HealthRegionData;
}

export interface HealthRegionData {
    healthRegion: string;
    province: string;
    population2016: number;
    populationDensityPerSqkm?: number;
}

// some health regions have the same name, so province needs to be specified
export interface HealthRegion {
    healthRegion: string;
    province: string;
}

export interface NationalCovidTimeSeries {
    [province: string]: ProvincialCovidTimeSeries;
}

export interface ProvincialCovidTimeSeries {
    [healthRegion: string]: RegionalCovidTimeSeries;
}

export interface RegionalCovidTimeSeries {
    province: string;
    healthRegion: string;
    population: number;
    activeCases: (number | null)[];
    newCases: (number | null)[];
    deaths: (number | null)[];
    resolutionTime: (number | null)[];
    r0: (number | null)[];
    reportedDates: string[];
}
