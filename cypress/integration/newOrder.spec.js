/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
/// <reference path="../support/index.d.ts" />

const emailServerId = "re0raxdu";
const supplierEmail = "supplieradmin@re0raxdu.mailosaur.net";
describe("New Order Dashboard", () => {
  beforeEach(() => {
    cy.visit("");
    cy.loginAsPurchaser();
    cy.contains(/new order/i).click();
  });

  it("Shows cart and allows users to navigate product categories", () => {
    getCart();
    productCategoriesVisibile();
    maskProductsVisible();
    goBackToProductCategories();
    productCategoriesVisibile();
  });

  it.only("Allows users to place orders", () => {
    const products = [
      {
        productName: "4mil ProNitrile Nitrile Gloves - Small",
        category: "Gloves",
        quantity: 1,
      },
    ];
    products.forEach((product) => addProductToCart(product));
    cy.contains(/place order/i).click();
    cy.contains("$36.61 CAD");
    // select the first payment method
    cy.findByLabelText("Payment Method").type("{enter}");
    cy.findByRole("button", { name: /confirm/i }).click();
    cy.url({ timeout: 15000 }).should("include", "/orders");
    products.forEach((product) => assertProductIsInOrderDetail(product));

    cy.findByTestId("orderProduct")
      .invoke("attr", "data-ticketid")
      .then((ticketId) => {
        cy.logout();
        // find ticket email and follow link
        cy.mailosaurGetMessage(emailServerId, {
          sentTo: supplierEmail,
          subject: "Betterfit Supply Net - New Ticket",
        }).then((email) => {
          const ticketLink = email.html.links.find(
            (link) => (link.text = "See ticket")
          );
          cy.visit(ticketLink.href);
        });
        cy.loginAsSupplier();
        cy.url().should("include", ticketId);
      });
    // transfer should have been recieved sucessfully
    cy.findByTestId("transfer", { timeout: 10000 }).contains("Success");
  });
});

const productCategoriesVisibile = () => {
  cy.contains(/surgical masks/i);
  cy.contains(/sanitizers/i);
  cy.contains(/gloves/i);
};

const maskProductsVisible = () => {
  cy.contains(/surgical masks/i).click();
  cy.contains(/Eternity Surgical Mask - 4 ply - CSA certificated/i);
};

const goBackToProductCategories = () => {
  cy.contains(/back to product categories/i).click();
};

const getCart = () => cy.findByRole("complementary", { name: "cart" });

/**
 * Adds the specified product to the cart and returns to the product view screen
 */
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
  if (quantity > 1) {
    getCart()
      .findByRole("listitem", { name: productName })
      .findByRole("spinbutton", { name: /quantity/i })
      .clear()
      .type(quantity)
      .should("have.value", quantity);
  }
  goBackToProductCategories();
};

const assertProductIsInOrderDetail = (product) => {
  cy.contains(product.productName);
  cy.contains(product.quantity);
};
