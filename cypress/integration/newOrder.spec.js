/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
/// <reference path="../support/index.d.ts" />

describe("New Order Dashboard", () => {
  const username = "facilityadmin";
  const password = "facilityadmin";

  before(() => {
    cy.healthApiAuth(username, password).then(
      (session) => (authSession = session)
    );
  });

  beforeEach(() => {
    cy.visitHealthLoggedIn(authSession);
  });

  it("Shows cart and allows users to navigate product categories", () => {
    getCart();
    productCategoriesVisibile();
    sanitizerProductsVisible();
    goBackToProductCategories();
    productCategoriesVisibile();
  });

  it("Shows correct search results for N95 masks", () => {
    cy.contains(/masks/i).click();
    cy.findByPlaceholderText(/search products/i).type("n95");
    cy.contains(/surgical mask/i).should("not.exist");
    cy.contains("3M N95 - 9211+");
    cy.contains("3M N95 - 8210V");
    cy.contains("3M N95 - 9211+");
  });

  it("Allows users to add a product to their cart and submit an order", () => {
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
    products.forEach((product) => addProductToCart(product));
    // submit order
    cy.findByRole("button", { name: /submit order/i }).click();
    // confirm in modal
    cy.findByRole("checkbox", { name: /agree to terms/i }).click({
      force: true,
    });
    cy.contains(/place order/i).click();
    cy.url().should("include", "/orders");
    products.forEach((product) => assertProductIsInOrderDetail(product));
  });
});

const productCategoriesVisibile = () => {
  cy.contains(/masks/i);
  cy.contains(/sanitizers/i);
  cy.contains(/eye protection/i);
  cy.contains(/filters/i);
};

const sanitizerProductsVisible = () => {
  cy.contains(/sanitizers/i).click();
  cy.contains(/walter surface technology/i);
  cy.contains(/igcksancs service/i);
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
