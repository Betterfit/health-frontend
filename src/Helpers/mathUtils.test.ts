import { rollingAverage, roundToNDecimals } from "Helpers/mathUtils";

describe("rollingAverage", () => {
  it("Works on regular values", () => {
    const output = rollingAverage([1, 2, 3, 4], 2);
    expect(output).toEqual([1, 1.5, 2.5, 3.5]);
  });

  it("Can handle null values #1", () => {
    const output = rollingAverage([2, 3, null, 3], 3);
    expect(output).toEqual([2, 2.5, 2.5, 3]);
  });
  it("Can handle null values #2", () => {
    const output = rollingAverage([2, 3, null, null], 2);
    expect(output).toEqual([2, 2.5, 3, null]);
  });
});

describe("roundToNDecimals", () => {
  it.each([
    // first element is the number, n is num decimal places, last is expected output
    [1 / 3, 2, 0.33],
    [4763.1234, 3, 4763.123],
    [398.75, 1, 398.8],
    [1.234, 1, 1.2],
  ])("Rounds %s to %s decimal place(s)", (num, n, rounded) =>
    expect(roundToNDecimals(num, n)).toEqual(rounded)
  );
});

// makes typescript happy
export {};
