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
