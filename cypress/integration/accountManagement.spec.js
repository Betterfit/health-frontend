describe("Account Management", () => {
  const emailServerId = "re0raxdu";
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
  it("Allows admins to create facilities and add new accounts to them.", () => {
    cy.loginAsPurchaserAdmin();
    cy.url().should("include", "/dashboard");
    cy.findByRole("link", { name: /admin/i }).click();
    // creates a name like "Test Facility 9754"
    const facilityName = "Test Facility " + Math.floor(Math.random() * 10000);
    cy.findByRole("tab", { name: /add facility/i }).click();
    cy.findByLabelText(/facility name/i).type(facilityName);
    cy.findByLabelText(/address/i).type("123 Sesame Street");
    cy.findByLabelText(/city/i).type("Edmonton");
    cy.findByLabelText(/postal code/i).type("A9A 9A9");
    cy.findByLabelText(/phone number/i).type("7805547999");
    cy.findByLabelText("province").type("{downarrow}{enter}");
    cy.findByRole("button", { name: /add facility/i }).click();
    cy.findByRole("form").should("not.exist");
    cy.findByRole("tabpanel", { name: /my facilities/i })
      .contains(facilityName)
      .should("have.length", 1);

    // Add users to facility
    cy.findByRole("tab", { name: /add users/i }).click();
    cy.findByRole("form", {
      name: /add user/i,
    }).within(() => {
      cy.findByRole("textbox", { name: /email/i }).type(newUser.email);
      cy.findByLabelText("facility").type(facilityName + "{downarrow}{enter}");
      cy.findByRole("radio", { name: /admin/i }).click();
      cy.findByRole("button", { name: /confirm/i }).click();
    });
    cy.findByRole("list", { name: /pending invitations/i }).within(() =>
      cy.findByTestId(newUser.email)
    );
    // user should get an invite email
    cy.mailosaurGetMessage(emailServerId, { sentTo: newUser.email }).then(
      (email) => {
        expect(email.subject).to.include("invited to " + facilityName);
      }
    );
    cy.logout();

    // newly created user signs in and completes profile
    cy.contains(/sign up/i).click();
    cy.findByRole("textbox", { name: /email/i }).type(newUser.email);
    // users have to enter their password twice to confirm
    cy.findAllByLabelText(/password/i).each((textbox) =>
      cy.wrap(textbox).type(newUser.password)
    );
    cy.findByRole("button", { name: /sign up/i }).click();
    // retrieving verification code
    cy.mailosaurGetMessage(emailServerId, {
      sentTo: newUser.email,
      subject: "Betterfit verification code",
    })
      .then((email) => {
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
    // should be signed in, with profile properly updated with names
    cy.url().should("include", "/dashboard");
    cy.contains(newUser.firstName);
    cy.contains(facilityName);
  });
});
