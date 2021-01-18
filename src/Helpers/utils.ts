export const setClipboard = (text: string) =>
  navigator.clipboard.writeText(text);

export const findFirstNonNull = <T>(array: (T | null)[], fallback?: T): T => {
  const val = array.find((val) => val !== null);
  if (val === undefined)
    if (fallback !== undefined) return fallback;
    else throw "All values were null and no fallback was specified";
  return val as T;
};

// exists solely to save client code from verbosity of .slice().reverse()
export const findLastNonNull = <T>(array: (T | null)[], fallback?: T): T => {
  return findFirstNonNull(array.slice().reverse(), fallback);
};
