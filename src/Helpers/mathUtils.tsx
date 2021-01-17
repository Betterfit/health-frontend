/**
 * Computes a rolling average for a list of values using an interval of size n.
 * Null values will be excluded from calculations but will still return a value.
 * @param values Array of values
 * @param n The previous n values will be used to compute the average
 */
export const rollingAverage = (
  values: (number | null)[],
  n: number,
  decimalPlaces: number = 1
): (number | null)[] => {
  const out: (number | null)[] = [];
  let denominator = 0;
  let intervalSum = 0;
  for (let i = 0; i < values.length; i++) {
    if (i - n >= 0) {
      const valToRemove = values[i - n];
      if (valToRemove !== null) {
        intervalSum -= valToRemove;
        denominator -= 1;
      }
    }
    const value = values[i];
    if (value !== null) {
      intervalSum += value;
      denominator += 1;
    }
    if (denominator > 0) {
      const avg = intervalSum / denominator;
      out.push(roundToNDecimals(avg, decimalPlaces));
    } else out.push(null);
  }
  return out;
};

export const roundToNDecimals = (num: number, n: number) => {
  const factor = Math.pow(10, n);
  return Math.round((num + Number.EPSILON) * factor) / factor;
};

export const logBase = (x: number, base: number): number => {
  return Math.log(x) / Math.log(base);
};

/**
 * Linearly interpolates null values in a list of numbers.
 * Null values that do not have atleast one number before and after them in the list do not get interpolated.
 * @param nums A list of numbers and null values
 */
export const interpolateNulls = (
  nums: (number | null)[]
): (number | null)[] => {
  const out = [];

  let nullCount = 0;
  let lastNum = null;
  for (const num of nums) {
    // if we've encountered a number already, mark that we've seen a null so we know
    // how many previous values to interpolate the next time we see a number.
    // if we haven't seen a number, just keep the value null
    if (num === null) {
      if (lastNum !== null) nullCount += 1;
      else out.push(null);
      continue;
    }

    if (nullCount === 0) {
      // we see a number and no previous values need to be interpolated
      out.push(num);
    } else {
      lastNum = lastNum as number; // we know that lastNum has been set at this point
      const slope = (num - lastNum) / (nullCount + 1);
      for (let i = 1; i <= nullCount; i++) out.push(lastNum + i * slope);
      out.push(num);
      nullCount = 0;
    }

    lastNum = num;
  }

  out.push(...Array(nullCount).fill(null));
  return out;
};
