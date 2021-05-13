import "@applitools/eyes-cypress";
interface AuthSession {
  user: any;
  token: string;
}
declare namespace Cypress {
  interface Chainable {
    healthApiAuth(username: string, password: string): Chainable<AuthSession>;
    /**
     * Use this to programatically log into the health website
     * @param authSession
     * @param path
     */
    visitHealthLoggedIn(
      authSession: AuthSession,
      path: ?string
    ): Chainable<AUTWindow>;
  }
}
