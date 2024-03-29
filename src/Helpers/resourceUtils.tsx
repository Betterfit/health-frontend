import { useState } from "react";
import { useQuery } from "react-query";
import { Resource, ResourceDetails, Tag } from "Types";
import Api from "./api";

type ResourceFilter = (resource: Resource) => boolean;

/**
 * This hook simplifies the fetching, searching and filtering of resources.
 * @param customFilters A list of filters to apply in addition to search and tag matching
 */
export const useResources = (customFilters: ResourceFilter[] = []) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  // stores tag pks (primary key) rather than whole tag
  const [selectedTagPKs, setSelectedTagPKs] = useState<number[]>([]);
  const api = new Api();
  const { data } = useQuery<Resource[]>(
    // the key is the combination of 'resources' and the search term, used for caching
    ["resources", searchTerm],
    async () =>
      await api.getResources(searchTerm).then((resp: any) => resp.data),
    { placeholderData: [], keepPreviousData: true, staleTime: 1000 * 60 }
  );
  const resources = data as Resource[];
  // For each resource, check that it passes every custom filter specified.
  const filteredResources: Resource[] = resources.filter((resource) =>
    customFilters.every((filter) => filter(resource))
  );

  const tagList = findAllUniqueTags(filteredResources);

  // filters out resources that don't match at least one selected tag
  const tagMatchingResources = findResourcesMatchingTagPKs(
    filteredResources,
    selectedTagPKs
  );

  const toggleTagSelect = (pk: number) => {
    if (selectedTagPKs.includes(pk))
      setSelectedTagPKs(selectedTagPKs.filter((tagPK) => tagPK !== pk));
    else setSelectedTagPKs([...selectedTagPKs, pk]);
  };

  // a bit of a hack for the moment to determine when to show the spinner
  const resourcesLoading = resources.length === 0 && !searchTerm;

  return {
    resources: tagMatchingResources,
    resourcesLoading,
    setSearchTerm,
    searchTerm,
    tagList,
    toggleTagSelect,
    selectedTagPKs,
  };
};

/**
 * Returns a list of resources that match all the given tags.
 * Not currently used, but maybe useful if desired behaviour changes.
 * Exported for ES Lint's sake.
 */
export const findResourcesMatchingAllTagPKs = (
  resources: Resource[],
  tagPKs: number[]
): Resource[] => {
  if (tagPKs.length === 0) return resources;
  const badResourcePKs = new Set<number>();
  // not the nicest time complexity but tagPKs and resource.tags won't be very long
  for (const resource of resources) {
    // check that the resource has every tag
    for (const tagPK of tagPKs) {
      if (resource.tags.some((tag) => tag.pk !== tagPK)) {
        badResourcePKs.add(resource.pk);
        continue;
      }
    }
  }
  return resources.filter((res) => !badResourcePKs.has(res.pk));
};

/**
 * Returns a list of resources that match atleast one of the given tags
 */
const findResourcesMatchingTagPKs = (
  resources: Resource[],
  tagPKs: number[]
): Resource[] => {
  if (tagPKs.length === 0) return resources;
  const matchingResources = [];
  // not the nicest time complexity but tagPKs and resource.tags won't be very long
  for (const resource of resources) {
    // check that the resource has every tag
    for (const tagPK of tagPKs) {
      if (resource.tags.some((tag) => tag.pk === tagPK)) {
        matchingResources.push(resource);
        break;
      }
    }
  }
  return matchingResources;
};

/**
 * Returns a list (without duplicates) of all tags found in a list of resources
 */
export const findAllUniqueTags = (resources: Resource[]): Tag[] => {
  const uniqueTags = [];
  const tagPKs = new Set();
  for (const resource of resources) {
    for (const tag of resource.tags) {
      if (!tagPKs.has(tag.pk)) {
        tagPKs.add(tag.pk);
        uniqueTags.push(tag);
      }
    }
  }
  return uniqueTags;
};

/**
 * Generates a printable address as a list of up to length 3.
 * 1. street address
 * 2. city + province
 * 3. postal code
 * Null elements will be excluded
 */
export const generateAddress = (resourceDetails: ResourceDetails): string[] => {
  const { street, city, province, postal_code } = resourceDetails;
  const address = [];
  if (street) address.push(resourceDetails.street);
  if (city && province) address.push(`${city}, ${province}`);
  if (province && postal_code) address.push(postal_code);
  return address;
};

/**
 * Generates a printable shipping address as a list of up to length 3.
 * 1. street address
 * 2. city + province
 * 3. postal code
 * Null elements will be excluded
 */
export const generateShippingAdress = (resourceDetails: any): string[] => {
  const {
    shipping_street,
    shipping_city,
    shipping_province,
    shipping_postal_code,
  } = resourceDetails;
  const address = [];
  if (shipping_street) address.push(resourceDetails.street);
  if (shipping_city && shipping_province)
    address.push(`${shipping_city}, ${shipping_province}`);
  if (shipping_province && shipping_postal_code)
    address.push(shipping_postal_code);
  return address;
};

/**
 * Strips out all non-numeric characters from a phone number
 * @param phoneNumber the phone number string to strip
 */
export const stripPhoneNumber = (phoneNumber: string): string => {
  // strips out all non-numeric chara
  return phoneNumber.replace(/[^0-9]/g, "");
};
