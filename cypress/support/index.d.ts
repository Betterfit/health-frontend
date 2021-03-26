interface AuthSession {
  user: any;
  token: string;
}
declare namespace Cypress {
  interface Chainable {
    healthApiAuth(username: string, password: string): Chainable<AuthSession>;
    visitHealthLoggedIn(authSession: AuthSession): Chainable<AUTWindow>;
  }
}
