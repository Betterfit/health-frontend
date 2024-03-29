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
  /** only available from the /me endpoint */
  organization?: string;
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
  // address
  street: string;
  street2: string;
  city: string;
  province: string;
  postalCode: string;
  // shipping
  carrier: string | null;
  credit: string;
}

export interface Facility {
  name: string;
  pk: number;
  id: number;
  email?: string;
  phoneNumber: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  fax?: string;
  website?: string;
  parentFacility?: string;
  parentOrganization: string;
  url: string;
  isAdmin?: boolean;
  isMember?: boolean;
  active: boolean;
}

export interface Product {
  id: number;
  name: string;
  active: boolean;
  description: string | "";
}

export interface ProductCategory {
  name: string;
  id: number;
  icon: string;
  backgroundColor: string;
  mainColor: string;
  count: number;
}

export interface ProductImage {
  image: string;
  width: number;
  height: number;
  id: number;
}
export interface ProductOption {
  /** The id that suppliers use internally to refer to this product, not
   * guaranteed to be unique */
  sku: string;
  /** The id in our database.  */
  id: number;
  name: string;
  optionLabel: string;
  productCategory: string;
  product: string;
  productDescription: string;
  productImage: string;
  productId: number;
  categoryId: number;
  images: ProductImage[];
  /** Decimal number stored as a string */
  price: string;
  forSale: boolean;
  supplier: Organization;
  freeShipping: boolean;
  width: number | null;
  height: number | null;
  length: number | null;
  sizeUnit: "cm" | "in" | null;
  weight: number | null;
  weightUnit: "kg" | "lb" | null;
  carrier: string | null;
  quantity: number;
}

interface BaseOrderProduct {
  order: number;
  id: number;
  quantity: number;
  productOption: ProductOption;
  shipping: string;
  pricePerUnit: string;
  warehouse: Facility | null;
  shippingProvider: string;
  trackingNumber: string;
  status: TicketStatus;
  timeCreated: string;
  timeShipped: string;
  appliedCredit: string;
}
export type TicketStatus = "open" | "shipped" | "delivered";

export interface Ticket extends BaseOrderProduct {
  warehouse: Facility;
  destination: Facility;
  purchaser: Organization;
}
export interface OrderProduct extends BaseOrderProduct {
  url: string;
  supplier?: Organization;
}
export interface Order {
  url: string;
  id: number;
  orderNo: string;
  orderDate: string;
  purchaseNo: string;
  authorUser: User;
  orderProducts: OrderProduct[];
  facility: Facility;
  status: "open" | "approved" | "delivered" | "cancelled" | "draft";
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

export interface ServerException {
  code: string;
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
  shipping: Money;
}

export interface OrderInvoice {
  total: Money;
  items: ProductInvoice[];
  taxes: Money;
  taxRate: number;
  taxName: string;
  applicationFee: Money;
  shipping: Money;
  appliedCredit: Money;
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
  appliedCredit: string;
}

export interface Transfer {
  id: number;
  total: string;
  completed: boolean;
  ticket: Ticket;
  timeCreated: string;
  recipient: Organization;
}

export interface CartItem {
  quantity: number;
  productOptionId: number;
}

export interface Inventory {
  /** The id of the inventory object */
  id: number;
  warehouseId: number;
  quantity: number;
  /** The amount of inventory that has been committed to orders */
  allottedQuantity: number;
  productOptionId: number;
  productOption: ProductOption;
}
