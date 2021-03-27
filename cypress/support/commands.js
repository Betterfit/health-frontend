// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "@testing-library/cypress/add-commands";

const apiUrl = Cypress.env("apiUrl");

Cypress.Commands.add("healthApiAuth", (username, password) =>
  cy
    .request("POST", apiUrl + "main/api-token-auth/", {
      username: username,
      password: password,
    })
    .its("body")
);

Cypress.Commands.add("visitHealthLoggedIn", (authSession, path = "/") => {
  cy.visit(path, {
    onBeforeLoad: (win) => {
      win.localStorage.setItem("user", JSON.stringify(authSession.user));
      win.localStorage.setItem("token", authSession.token);
    },
  });
});
