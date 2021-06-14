import camelcaseKeys from "camelcase-keys";

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
