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
  cumRecoveredCases: number;
  cumVaccFull: number;
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

export interface HealthRegionsByProvince {
  [province: string]: HealthRegion[];
}

export interface HealthRegionsByCountry {
  [country: string]: HealthRegionsByProvince;
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
  cumRecoveries: (number | null)[];
  reportedDates: string[];
  cumVaccFull: (number | null)[];
}

export interface VaccineStats {
  province: string;
  healthRegion: string;
  pop1000s: number;
  totalImmune: number;
  needVaccine: number;
  sickAfterHerdImmunity: number;
  notSickAfterHerdImmunity: number;
}

export interface VaccineChartOptions {
  // get passed to our R estimation model
  restaurantCapacity: number;
  gymCapacity: number;
  retailCapacity: number;
  essentialRetailCapacity: number;
  worshipCapacity: number;
  masksMandatory: boolean;
  elementarySchoolsOpen: boolean;
  secondarySchoolsOpen: boolean;
  curfew: boolean;
  // not used by model, just ui / clientside math
  vaccineUsage: VaccineUsage;
  lockedVaccines: VaccineType[];
}

export type VaccineUsage = Record<VaccineType, number>;

export type VaccineType = "jj" | "pfizer" | "moderna" | "astrezeneca";

export interface Vaccine {
  type: VaccineType;
  efficacy: number;
}

export interface Selectable<T> {
  item: T;
  selected: boolean;
}

export interface REstimate {
  rV0: number;
}

export type TimeSeriesKey =
  | "activeCases"
  | "newCases"
  | "deaths"
  | "resolutionTime"
  | "r0"
  | "cumRecoveries"
  | "cumVaccFull";

export type ChartType = "timeseries" | "vaccine" | "ranking";
