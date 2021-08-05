/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
/// <reference path="../support/index.d.ts" />

describe("Order Flow", () => {
  const admin = {
    email: Cypress.env("ADMIN_EMAIL"),
    password: Cypress.env("ADMIN_PASSWORD"),
  };
  const member = {
    email: Cypress.env("MEMBER_EMAIL"),
    password: Cypress.env("MEMBER_PASSWORD"),
  };
  //   const emailAddress = mailosaur.servers.generateEmailAddress(emailServerId);
  const products = [
    {
      productName: "3M N95 - 9211+",
      productVariation: "9211+",
      category: /masks/i,
      quantity: 12,
    },
    {
      productName: "3M Easi Care Prefilter - 5N1",
      productVariation: "5N1",
      category: /filters/i,
      quantity: 35,
    },
  ];
  beforeEach(() => {
    cy.visit("");
  });
  it("Allows members to create orders that can be approved by admins", () => {
    cy.login(member.email, member.password);
    cy.findByRole("link", { name: /new order/i }).click();
    addProductToCart(products[0]);
    addProductToCart(products[1]);
    cy.findByRole("button", { name: /submit order/i }).click();
    // confirm in modal
    cy.findByRole("checkbox", { name: /agree to terms/i }).click({
      force: true,
    });
    // generates a random 10 character string
    const purchaseNumber = Math.random().toString(36).substr(2, 10);
    cy.findByRole("textbox", { name: /order number/i }).type(purchaseNumber);
    cy.contains(/place order/i).click();
    cy.url().should("include", "/orders");
    products.forEach((product) => assertProductIsInOrderDetail(product));
    // cy.contains(purchaseNumber).should("be.visible");
    cy.logout();
    cy.login(admin.email, admin.password);
    // make sure we can see and open order with the number we specified
    cy.visit("/dashboard/orders");
    cy.findByRole("tab", { name: /open/i }).click();
    cy.contains(purchaseNumber);
    // approve all requested orders
    cy.contains(/requests/i).click();
    cy.findByRole("button", { name: /approve all/i })
      .should("not.be.disabled")
      .click();
    // we should be able to see an approved order with the number we specified
    cy.visit("/dashboard/orders");
    cy.findByRole("tab", { name: /approved/i }).click();
    cy.contains(purchaseNumber);
  });

  // it("Allows admin to deny orders", () => {
  //   cy.loginAsPurchaserAdmin();
  //   addProductToCart(products[0]);
  //   cy.findByRole("button", { name: /submit order/i }).click();
  //   // confirm in modal
  //   cy.findByRole("checkbox", { name: /agree to terms/i }).click({
  //     force: true,
  //   });
  //   // generates a random 10 character string
  //   const orderNumber = Math.random().toString(36).substr(2, 10);
  //   cy.findByRole("textbox", { name: /order number/i }).type(orderNumber);
  //   cy.findByRole("textbox", { name: /order number/i }).type(orderNumber);
  // });
  // cy.contains(/requests/i).click();
  // cy.findByRole("button", { name: /approve all/i }).click();
});

const getCart = () => cy.findByRole("complementary", { name: "cart" });
const goBackToProductCategories = () => {
  cy.contains(/back to product categories/i).click();
};
const addProductToCart = (product) => {
  const { productName, quantity, category } = product;
  cy.contains(category).click();
  cy.findByRole("listitem", { name: productName })
    // have to mouse over in order to reveal quick add button
    .trigger("mouseover")
    .findByRole("button", { name: "quick add" })
    .click();
  getCart().contains(productName);
  // set quantity to correct amount
  getCart()
    .findByRole("listitem", { name: productName })
    .findByRole("spinbutton")
    .clear()
    .type(quantity)
    .should("have.value", quantity);
  goBackToProductCategories();
};

const assertProductIsInOrderDetail = (product) => {
  cy.contains(product.productVariation);
  cy.contains(product.quantity);
};
