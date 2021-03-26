/// <reference types="cypress" />

const apiUrl = Cypress.env("apiUrl");
const username = "facilityadmin";
describe("Health Profile", () => {
  let user = null;
  let token = null;

  before(() => {
    cy.request("POST", apiUrl + "main/api-token-auth/", {
      username: username,
      password: username,
    })
      .its("body")
      .then((body) => {
        user = body.user;
        token = body.token;
      });
  });

  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad: (win) => {
        win.localStorage.setItem("user", JSON.stringify(user));
        win.localStorage.setItem("token", token);
      },
    });
  });

  it("Shows profile buttons when profile is clicked on", () => {
    cy.contains(username).click();
    cy.contains("Facility Profile");
    cy.contains(/^Profile/i);
    cy.contains("Logout");
  });

  it("Opens facility profile when clicked", () => {
    cy.contains(username).click();
    cy.findByRole("button", { name: /Facility Profile/i }).click();
    cy.contains("Address");
    cy.contains("Edmonton");
    cy.contains("Alberta");
    cy.contains("T8N6V7");
    cy.contains("10139 81 Ave NW");
  });

  it("Opens user profile when clicked", () => {
    openUserProfile();
    assertInEnglishUserProfile();
  });

  it("Lets you change langauge in user profile", () => {
    openUserProfile();
    cy.findByRole("button", { name: /French/i }).click();

    // check that text is in french
    cy.contains(/langue de défault/i);
    cy.contains(/default language/i).should("not.exist");
    cy.contains(/nouvelle commande/i);

    cy.findByRole("button", { name: /anglais/i }).click();
    assertInEnglishUserProfile();
  });
});

const openUserProfile = () => {
  cy.contains(username).click();
  cy.findByRole("button", { name: /^Profile/i }).click();
};

const assertInEnglishUserProfile = () => {
  cy.contains(username);
  // change language toggle
  cy.contains(/default language/i);
  cy.contains(/english/i);
  cy.contains(/french/i);
  // change password form
  cy.contains(/change password/i);
  cy.contains(/old password/i);
  cy.contains(/new password/i);
  // change name/email
  cy.contains(/email/i);
  cy.contains(/name/i);
};
