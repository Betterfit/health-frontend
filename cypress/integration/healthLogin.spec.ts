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

  it("Allows you to logout and log back in as a different user", () => {
    const user1 = "trafficcontroller";
    const user2 = "facilityadmin";

    // login as user1
    login(user1, user1);
    cy.url().should("include", "/dashboard");

    // logout
    cy.contains(user1).click();
    cy.findByRole("link", { name: /Logout/i }).click();
    cy.url().should("include", "/login");

    // login as user2
    login(user2, user2);
    cy.contains(user2).click();
    cy.url().should("include", "/dashboard");
  });
});

const enterEmail = (email) =>
  cy.findByRole("textbox", { name: /email/i }).type(email);

// we don't log the password
const enterPassword = (password) =>
  cy.get("#password").type(password, { log: false });
const loginButton = () => cy.findByRole("button", { name: /login/i });

export const login = (email, password) => {
  enterEmail(email);
  enterPassword(password);
  loginButton().click();
};
