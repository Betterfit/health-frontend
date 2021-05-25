// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
// translator requires authstore hook, so we just mock it
import Translator from "Helpers/Translator";

jest.mock("Helpers/Translator");
Translator.mockImplementation((word) => word);

// return a fake cognito token so that api requests don't throw errors
// we mock just one function exported by this module
jest.mock("Helpers/cognito", () => ({
  ...jest.requireActual("Helpers/cognito"),
  getIdToken: async () => new Promise((resolve) => resolve("dummy token")),
}));
