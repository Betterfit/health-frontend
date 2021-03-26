/// <reference types="cypress" />

describe("PPE login", () => {
  beforeEach(() => cy.visit(""));

  it("Can load the login page", () => {
    cy.contains("Email");
    cy.contains("Password");
    loginButton();
  });

  [
    ["Traffic Controller", "/dashboard/matches", "trafficcontroller"],
    ["Supplier Admin", "/dashboard/inventory", "supplieradmin"],
    ["Health Care Provider", "/dashboard/new-order", "facilityadmin"],
  ].forEach(([userType, loggedInPath, username]) =>
    it(`Lets ${userType} log in to see ${loggedInPath}`, () => {
      enterEmail(username);
      enterPassword(username);
      loginButton().click();
      cy.url().should("include", loggedInPath);
      cy.contains(username);
    })
  );
});

const enterEmail = (email) =>
  cy.findByRole("textbox", { name: /email/i }).type(email);
// we don't log the password
const enterPassword = (password) =>
  cy.get("#password").type(password, { log: false });
const loginButton = () => cy.findByRole("button", { name: /login/i });
