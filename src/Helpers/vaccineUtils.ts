import {
  VaccineType,
  VaccineUsage,
  VariantPrevelance,
  VariantType,
} from "Types";

/**
 * Returns the default vaccine usage, which maps vaccine types to their usage from 0 to 1.
 */
export const defaultVaccineUsage = (): VaccineUsage => ({
  jj: 0.25,
  moderna: 0.25,
  astrezeneca: 0.25,
  pfizer: 0.25,
});

/**
 * Finds average vaccine efficacy weighted by the usage of each type.
 * @param vaccineUsage Maps vaccine type to efficacy
 * @returns The efficacy from 0 to 1
 */
export const computeVaccineEfficacy = (
  vaccineUsage: VaccineUsage,
  variantPrevelance: VariantPrevelance
): number => {
  let result = 0;
  for (const variant in effectivenes) {
    for (const vaccine in effectivenes[variant as VariantType]) {
      result +=
        variantPrevelance[variant as VariantType] *
        vaccineUsage[vaccine as VaccineType] *
        effectivenes[variant as VariantType][vaccine as VaccineType];
    }
  }
  return result;
};

export const defaultVariantPrevalance = (): VariantPrevelance => {
  return {
    wild: 0.8,
    uk: 0.05,
    southafrica: 0.05,
    brazil: 0.05,
    india: 0.05,
  };
};

export const vaccineLabels: Record<VaccineType, string> = {
  jj: "Johnson & Johnson",
  pfizer: "Pfizer",
  astrezeneca: "AstraZeneca",
  moderna: "Moderna",
};

export const variantLabels: Record<VariantType, string> = {
  wild: "Wild",
  uk: "UK",
  southafrica: "South Africa",
  brazil: "Brazil P.1",
  india: "India",
};

const effectivenes: Record<VariantType, Record<VaccineType, number>> = {
  wild: {
    pfizer: 0.95,
    moderna: 0.941,
    astrezeneca: 0.667,
    jj: 0.665,
  },
  uk: {
    pfizer: 0.95,
    moderna: 0.941,
    astrezeneca: 0.746,
    jj: 0.665,
  },
  southafrica: {
    pfizer: 0.316,
    moderna: 0.16,
    astrezeneca: 0.104,
    jj: 0.57,
  },
  brazil: {
    pfizer: 0.316,
    moderna: 0.7999,
    astrezeneca: 0.3855,
    jj: 0.66,
  },
  india: {
    pfizer: 0.5173,
    moderna: 0.6336,
    astrezeneca: 0.3855,
    jj: 0.63,
  },
};
