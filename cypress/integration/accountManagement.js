describe("Account Management", () => {
  const emailServerId = "re0raxdu";
  const username = "yash@betterfit.co";
  const password = "scubaTree2!";
  //   const emailAddress = mailosaur.servers.generateEmailAddress(emailServerId);
  const newUser = {
    email: "",
    password: "scubaTree2!",
    firstName: "Emily",
    lastName: "Faker",
  };
  before(() => {
    cy.mailosaurGenerateEmailAddress(emailServerId).then((emailAddress) => {
      newUser.email = "newUser" + emailAddress;
    });
  });
  beforeEach(() => cy.visit(""));
  it("Allows admins to create accounts.", () => {
    login(username, password);
    cy.url().should("include", "/dashboard");
    cy.findByRole("link", { name: /accounts/i }).click();
    // Add users to facility
    cy.findByRole("button", { name: /add users/i }).click();
    cy.findByRole("form", {
      name: /add user/i,
    }).within(() => {
      cy.findByRole("textbox", { name: /email/i }).type(newUser.email);
      cy.findByLabelText("facility").type("Burger King{downarrow}{enter}");
      cy.findByRole("radio", { name: /admin/i }).click();
      cy.findByRole("button", { name: /confirm/i }).click();
    });
    // log out
    cy.findByRole("button", { name: "My Account" }).click();
    cy.findByRole("link", { name: /logout/i }).click();
    // newly created user signs in and completes profile
    cy.contains(/sign up/i).click();
    cy.findByRole("textbox", { name: /email/i }).type(newUser.email);
    // users have to enter their password twice to confirm
    cy.findAllByLabelText(/password/i).each((textbox) =>
      cy.wrap(textbox).type(newUser.password)
    );
    cy.findByRole("button", { name: /sign up/i }).click();
    // retrieving verification code
    cy.mailosaurGetMessage(emailServerId, { sentTo: newUser.email })
      .then((email) => {
        expect(email.subject).to.equal("Betterfit verification code");
        cy.log(email.html.body);
        const verificationCode = email.html.body.match("([0-9]{6})")[0];
        cy.findByRole("textbox", { name: /code/i }).type(verificationCode);
      })
      .as("getCode");
    cy.findByRole("button", { name: /verify code/i }).click();
    // fill in profile information
    cy.findByRole("textbox", { name: /first name/i }).type(newUser.firstName);
    cy.findByRole("textbox", { name: /last name/i }).type(newUser.lastName);
    cy.findByRole("button", { name: /complete/i }).click();
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
