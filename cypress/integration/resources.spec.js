/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
/// <reference path="../support/index.d.ts" />

describe("Resources", () => {
  const username = "facilityadmin";
  const password = "facilityadmin";

  it("Shows resources and lets users search and filter", () => {
    cy.vist("/");
    login(Cypress.env("MEMBER_EMAIL"), Cypress.env("MEMBER_PASSWORD"));
    cy.findByRole("link", { name: /resources/i }).click();
    const resourceExerpts = [
      // not visible after searching
      "Logistik Unicorp",
      // visible after searching
      "COVID-19 medical masks and respirators",
      // visible after searching, filtering by resource type
      "Assessment of Masks and Aerosol Characterization from",
      // visible after searching, filtering by resource type and tag
      "Filtering Facepiece Respirator Mask Sterilization Oven",
      "Potent Renewable Anti-Viral Face Mask",
    ];
    getSearchbar().type("mask");
    [1, 2, 3, 4].forEach((i) =>
      // timeout only really used for the first one
      cy.contains(resourceExerpts[i], { timeout: 20000 })
    );
    cy.contains(resourceExerpts[0]).should("not.exist");

    // fewer results should be visible after filtering by resource type = research
    clickOnResourceTypeFilter(/research/i);
    [(2, 3, 4)].forEach((i) => cy.contains(resourceExerpts[i]));

    clickOnResourceTagFilter(/supply and business response/i);
  });
});

const getSearchbar = () =>
  cy.findByRole("textbox", { name: /search resources/i });

const clickOnResourceTypeFilter = (resourceType) =>
  cy
    .findByRole("list", { name: /resource types/i })
    .contains(resourceType)
    .click();

const clickOnResourceTagFilter = (tagName) =>
  cy.findByRole("list", { name: "Tag List" }).contains(tagName).click();

const enterEmail = (email) =>
  cy.findByRole("textbox", { name: /email/i }).type(email);
// we don't log the password
const enterPassword = (password) =>
  cy.get("#password").type(password, { log: false });
const loginButton = () => cy.findByRole("button", { name: /^login$/i });

const login = (email, password) => {
  enterEmail(email);
  enterPassword(password);
  loginButton().click();
};
