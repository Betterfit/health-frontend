import {
  interpolateNulls,
  logBase,
  rollingAverage,
  roundToNDecimals,
} from "Helpers/mathUtils";

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

describe("logBase", () => {
  it.each([
    [9, 3, 2],
    [6.5, 1.2, 10.2665],
    [2000, 1 / 0.9, 72.1418],
    [1.4, 0.4, -0.3672],
  ])("Computes log of %s in base %s = %s", (x, base, expected) => {
    const result = logBase(x, base);
    expect(roundToNDecimals(result, 4)).toEqual(expected);
  });

  describe("interpolateNulls", () => {
    it.each([
      [
        [1, 2, null, 4], // input array
        [1, 2, 3, 4], // output array
      ],
      [
        [1, 2, null, null, 5],
        [1, 2, 3, 4, 5],
      ],
      [
        [0, 1, 0.5, null, 0.5],
        [0, 1, 0.5, 0.5, 0.5],
      ],
      [
        [1, null, 1.5, null, 2.5],
        [1, 1.25, 1.5, 2, 2.5],
      ],
      [
        [1, null, null, 1.6, null, 3, null, 2],
        [1, 1.2, 1.4, 1.6, 2.3, 3, 2.5, 2],
      ],
      [
        // we don't interpolate null values on the edges
        [null, null, 1.2, null, 1.6, null, null],
        [null, null, 1.2, 1.4, 1.6, null, null],
      ],
    ])("input: %s, expected: %s", (input, expected) => {
      const output = interpolateNulls(input);
      output.forEach((num, i) =>
        expected[i] === null
          ? num === null
          : expect(num).toBeCloseTo(expected[i] as number)
      );
    });
  });
});

// makes typescript happy
export {};
