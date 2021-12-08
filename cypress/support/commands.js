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

const login = (email, password) => {
  cy.findByRole("textbox", { name: /email/i }).type(email);
  // we don't log the password
  cy.get("#password").type(password, { log: false });
  cy.findByRole("button", { name: /login/i }).click();
  // wait for redirect
  cy.url({ timeout: 16000 }).should("contain", "dashboard");
};

const logout = () => {
  cy.findByRole("button", { name: "My Account" }).click();
  cy.findByRole("link", { name: /logout/i }).click();
};
Cypress.Commands.add("login", (email, password) => login(email, password));
Cypress.Commands.add("loginAsPurchaserAdmin", () =>
  login(Cypress.env("ADMIN_EMAIL"), Cypress.env("ADMIN_PASSWORD"))
);
Cypress.Commands.add("loginAsPurchaser", () =>
  login(Cypress.env("MEMBER_EMAIL"), Cypress.env("MEMBER_PASSWORD"))
);
Cypress.Commands.add("loginAsSupplier", () =>
  login("supplieradmin@re0raxdu.mailosaur.net", "scubaTree2!")
);
Cypress.Commands.add("logout", logout);

// https://medium.com/@michabahr/testing-stripe-elements-with-cypress-5a2fc17ab27b
Cypress.Commands.add("iframeLoaded", { prevSubject: "element" }, ($iframe) => {
  const contentWindow = $iframe.prop("contentWindow");
  return new Promise((resolve) => {
    if (contentWindow && contentWindow.document.readyState === "complete") {
      resolve(contentWindow);
    } else {
      $iframe.on("load", () => {
        resolve(contentWindow);
      });
    }
  });
});
Cypress.Commands.add(
  "getInDocument",
  { prevSubject: "document" },
  (document, selector) => Cypress.$(selector, document)
);

Cypress.Commands.add("getWithinIframe", (targetElement) =>
  cy.get("iframe").iframeLoaded().its("document").getInDocument(targetElement)
);
