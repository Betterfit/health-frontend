export const provinces = [
  { name: "Alberta", abbreviation: "AB" },
  { name: "British Columbia", abbreviation: "BC" },
  { name: "Manitoba", abbreviation: "MB" },
  { name: "Nova Scotia", abbreviation: "NS" },
  { name: "New Brunswick", abbreviation: "NB" },
  { name: "Ontario", abbreviation: "ON" },
  { name: "Prince Edward Island", abbreviation: "PE" },
  { name: "Quebec", abbreviation: "QC" },
  { name: "Saskatchewan", abbreviation: "SK" },
  { name: "Newfoundland and Labrador", abbreviation: "NL" },
] as const;

export const supportedProvinces = provinces.filter((prov) =>
  ["AB", "MB", "ON", "SK"].includes(prov.abbreviation)
);

export type Province = typeof provinces[number];
export type ProvinceName = Province["name"];
