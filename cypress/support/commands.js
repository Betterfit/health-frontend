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
// some very tricky to work out errors get thrown when importing amplify
import Amplify, { Auth } from "aws-amplify";
import "cypress-mailosaur";

const cognitoConfig = {
  region: Cypress.env("REACT_APP_COGNITO_REGION"),
  userPoolId: Cypress.env("REACT_APP_COGNITO_USER_POOL_ID"),
  clientId: Cypress.env("REACT_APP_COGNITO_CLIENT_ID"),
};

Amplify.configure({
  Auth: {
    region: cognitoConfig.region,
    userPoolId: cognitoConfig.userPoolId,
    userPoolWebClientId: cognitoConfig.clientId,
  },
});

Cypress.Commands.add("healthApiAuth", (username, password) =>
  Auth.signIn(username, password)
);

Cypress.Commands.add("visitHealthLoggedIn", (cognitoUser, path = "/") => {
  cy.visit(path, {
    onBeforeLoad: (win) => {
      const idToken = cognitoUser.signInUserSession.idToken.jwtToken;
      const accessToken = cognitoUser.signInUserSession.accessToken.jwtToken;

      const makeKey = (name) =>
        `CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.${cognitoUser.username}.${name}`;

      win.setLocalStorage(makeKey("accessToken"), accessToken);
      win.setLocalStorage(makeKey("idToken"), idToken);
      win.setLocalStorage(
        `CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.LastAuthUser`,
        cognitoUser.username
      );
    },
  });
});
