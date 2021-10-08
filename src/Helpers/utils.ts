import camelcaseKeys from "camelcase-keys";
import moment from "moment";

export const setClipboard = (text: string) =>
  navigator.clipboard.writeText(text);

export const findFirstNonNull = <T>(array: (T | null)[], fallback?: T): T => {
  const val = array.find((val) => val !== null);
  if (val === undefined)
    if (fallback !== undefined) return fallback;
    else throw Error("All values were null and no fallback was specified");
  return val as T;
};

// exists solely to save client code from verbosity of .slice().reverse()
export const findLastNonNull = <T>(array: (T | null)[], fallback?: T): T => {
  return findFirstNonNull(array.slice().reverse(), fallback);
};

// converts all of the keys in a potentially nested object from snake case to camel case
export const convertFromSnake = (object: any): any =>
  camelcaseKeys(object, { deep: true });

// typesafe pick function
// https://stackoverflow.com/questions/47232518/write-a-typesafe-pick-function-in-typescript
export const subset = <T, K extends keyof T>(
  obj: T,
  ...keys: (keyof T)[]
): Pick<T, K> => {
  const ret: any = {};
  keys.forEach((key) => {
    ret[key] = obj[key];
  });
  return ret;
};

/**
 * Null filtering that typescript will recognize.
 * Use with array.filter
 */
export const notNull = <T>(value: T | null | undefined): value is T =>
  value != null;
/**
 * Formats like this: Aug 16, 2021 - 6:07 PM
 */
export const formatTimeStamp = (
  timeStamp: string,
  dateOnly: boolean = false
): string =>
  //  https://momentjs.com/docs/#/displaying/
  moment(timeStamp).format("MMM D, YYYY" + (dateOnly ? "" : " - h:mm A"));

export const formatCurrency = (
  price: number | string | undefined | null
): string => {
  if (price == null) return "";
  if (typeof price === "string") price = Number(price);
  return `$${price.toFixed(2)} CAD`;
};

/**
 * Turns an object into a query string: ?a=3&b=fdafda
 * Excludes values that aren't truthy.
 */
export const buildQueryString = (object: object | undefined): string => {
  if (!object) return "";
  const params = new URLSearchParams();
  Object.entries(object).forEach(
    ([key, val]) => val != null && params.set(key, String(val))
  );
  return "?" + params.toString();
};
