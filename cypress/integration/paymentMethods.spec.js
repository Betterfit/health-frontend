describe("Payment Methods", () => {
  const member = {
    email: Cypress.env("MEMBER_EMAIL"),
    password: Cypress.env("MEMBER_PASSWORD"),
  };
  before(() => {
    // required to access stripe iframe
    Cypress.config("chromeWebSecurity", false);
  });
  beforeEach(() => cy.visit(""));
  it("Admins can add payment methods and (de)authorize users", () => {
    Cypress.config("chromeWebSecurity", false);
    cy.loginAsPurchaserAdmin();
    cy.findByRole("link", { name: /accounts/i }).click();
    cy.findByRole("tab", { name: /add payment method/i }).click();

    const paymentMethodName =
      "Credit Card " + Math.floor(Math.random() * 10000);
    cy.findByLabelText(/payment method name/i).type(paymentMethodName);
    cy.findByLabelText(/card holder name/i).type("Ritchie Moneybags");
    // stripe form is inside of an iframe
    cy.getWithinIframe('[name="cardnumber"]').type("4242424242424242");
    cy.getWithinIframe('[name="exp-date"]').type("1232");
    cy.getWithinIframe('[name="cvc"]').type("987");
    cy.getWithinIframe('[name="postal"]').type("12345");
    cy.findByRole("button", { name: /save card/i }).click();

    // payment method should be added to the list
    cy.findByRole("list", { name: /credit cards/i })
      .contains(paymentMethodName)
      .click();
    cy.contains("Owner: Purchaser Admin");

    // authorize and then deauthorize user
    cy.findByLabelText("New User").type(member.email + "{downarrow}{enter}");
    cy.findByRole("button", { name: /authorize user/i }).click();
    cy.findByTestId("authorizedUser-" + member.email)
      .findByRole("button", { name: /deauthorize/i })
      .click();
    cy.findByTestId("authorizedUser-" + member.email).should("not.exist");
  });
});
