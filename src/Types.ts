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

  variantPrevelance: VariantPrevelance;
  lockedVariants: VariantType[];
}

export type VaccineUsage = Record<VaccineType, number>;

export type VaccineType = "jj" | "pfizer" | "moderna" | "astrezeneca";

export type VariantPrevelance = Record<VariantType, number>;

export type VariantType = "wild" | "uk" | "southafrica" | "brazil" | "india";

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

export type Country = "Canada" | "US";

export interface User {
  id: number;
  url: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserProfile extends User {
  userProfile: {
    userType: string;
    supplier: string;
    supplierName: string;
  };
  isOrganizationAdmin: boolean;
  facilityMembership: FacilityMembership[];
}
export interface FacilityMembership {
  url: string;
  facilityId: number;
  facility: string;
  isAdmin: boolean;
}

export interface Organization {
  id: number;
  name: string;
  url: string;
  isPurchaser: boolean;
  isSupplier: boolean;
  // my_organization endpoint also specifies if the user is an administrator for the organization
  isAdmin: boolean;
  organizationImage: string;
  offerReturns: boolean;
  returnPolicyLink: string;
}

export interface Facility {
  name: string;
  pk: number;
  id: number;
  email: string;
  phoneNumber: string;
  region?: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  shippingStreet: string;
  shippingCity: string;
  shippingProvince: string;
  shippingPostalCode: string;
  fax?: string;
  website?: string;
  parentFacility?: string;
  parentOrganization: string;
  url: string;
  isAdmin?: boolean;
}
export interface Ticket {
  id: number;
  timeCreated: string;
  timeShipped: string;
  status: "open" | "shipped" | "delivered";
  shippingProvider: string;
  trackingNumber: string;
}
export interface PurchaserTicket extends Ticket {
  warehouse: Facility;
  supplier: Organization;
  orderProductId: number;
}
export interface SupplierTicket extends Ticket {
  url: string;
  orderProduct: OrderProduct;
  destination: Facility;
  purchaser: Organization;
}
export interface ProductCategory {
  name: string;
  id: number;
  icon: string;
  backgroundColor: string;
  mainColor: string;
  count: number;
}
export interface ProductOption {
  id: number;
  name: string;
  optionLabel: string;
  productCategory: string;
  product: string;
  productVariation: string;
  productDescription: string;
  productImage: string;
  productId: number;
  categoryId: number;
}
export interface OrderProduct {
  url: string;
  order: number;
  id: number;
  priority: "normal" | "stat";
  quantity: number;
  supplierOrg?: Organization;
  productOption: ProductOption;
  ticket?: PurchaserTicket;
  shipping: string;
  pricePerUnit: string;
}
export interface Order {
  url: string;
  pk: number;
  orderNo: string;
  orderDate: string;
  purchaseNo: string;
  authorUser: User;
  orderProducts: OrderProduct[];
  facility: Facility;
  status: "open" | "approved" | "delivered" | "canceled" | "draft";
}

export interface SupplierQuote {
  supplier: Organization;
  priceInfo: {
    pricePer: number;
    totalPrice: number;
    minPricePer: number;
    maxPricePer: number;
  };
}

export interface SupplierPriceRange {
  supplier: Organization;
  priceInfo: { minPricePer: number; maxPricePer: number };
}

export interface ProductPricing {
  productOptionId: number;
  quantity: number;
  purchaseOptions: SupplierQuote[];
}

export interface PaymentMethod {
  id: number;
  url: string;
  name: string;
  owner: User;
  authorizedUsers: User[];
  stripeId: string;
  stripeCustomerId: string;
  timeCreated: string;
}

export interface Error {
  message: string;
}
export interface Money {
  amount: number;
  currency: string;
}

export interface SupplierPricing {
  organizationId: number;
  productOptionId: number;
  price: number;
  currency: string;
  url: string;
}

export interface ConnectedAccount {
  organizationId: number;
  setUpComplete: boolean;
  stripeInfo: {
    bankAccounts: BankAccount[];
  };
  balance: {
    pending: Money;
    available: Money;
  };
}

export interface BankAccount {
  bankName: string;
  country: string;
  currency: string;
  routingNumber: string;
  last4: string;
}

export interface ProductInvoice {
  supplierId: number;
  destFacilityId: number;
  orderProductId: number;
  productId: number;
  quantity: number;
  baseTotal: Money;
}

export interface OrderInvoice {
  total: Money;
  items: ProductInvoice[];
  taxes: Money;
  taxRate: number;
  taxName: string;
  applicationFee: Money;
}

export interface Payment {
  id: number;
  productOptionId: number;
  total: string;
  orderId: number;
  paymentMethodName: string;
  paymentMethodId: number;
  payer: User;
  appFee: number;
  taxes: number;
  timeCreated: string;
  order: Order;
}

export interface Transfer {
  id: number;
  total: string;
  completed: boolean;
  orderProduct: OrderProduct;
  timeCreated: string;
}
