/// <reference types="cypress" />

const email = "yash@betterfit.co";
const password = Cypress.env("password");
const loggedInPath = "/covid/timeseries";

describe("Covid login", () => {
  beforeEach(() => cy.visit("/covid"));
  it("Can load the login page", () => {
    cy.contains("Email");
    cy.contains("Password");
    loginButton();
  });

  it("Allows users to login", () => {
    enterEmail(email);
    enterPassword(password);
    loginButton().click();
    cy.url().should("include", loggedInPath);
  });

  it("Does not let users login without username/password", () => {
    cy.contains("Login").click();
    cy.url().should("not.include", loggedInPath);
  });

  it("Does not let users login with incorrect username/password", () => {
    cy.visit("");

    enterEmail(email);
    enterPassword("incorrectpassword");
    loginButton().click();
    cy.url().should("not.include", loggedInPath);
  });
});

const enterEmail = (email) =>
  cy.findByRole("textbox", { name: /email/i }).type(email);
// we don't log the password
const enterPassword = (password) =>
  cy.get("#password").type(password, { log: false });
const loginButton = () => cy.findByRole("button", { name: /login/i });
