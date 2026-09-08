import cartLocators from "../locators/cart.locators";
import { slugify } from "../support/utils";

class CartPage {

 verifySelectedProductInCart(): this {
  cy.get<string>("@selectedProduct").then((name) => {
    cy.get(cartLocators.cartItemName).should("contain.text", name);
  });
  return this;
} 

verifyAddedProductsInCart(): this {
  cy.get<string[]>("@addedProducts").then((names) => {
    names.forEach((name) => {
      cy.get(cartLocators.cartItemName).should("contain.text", name);
    });
  });
  return this;
}

verifySelectedProductPrice(): this {
  cy.get<string>("@selectedProductPrice").then((price) => {
    cy.get(cartLocators.productItemPrice)
      .should("contain.text", price);
  });
  return this;
}

verifySelectedProductDescription(): this {
  cy.get<string>("@selectedProductDescription").then((description) => {
    cy.get(cartLocators.productItemDescription)
      .should("contain.text", description);
  });
  return this;
}

removeSelectedProduct(): this {
  cy.get<string>("@selectedProduct").then((name) => {
  cy.get(cartLocators.removeButton(slugify(name))).click();
  });
  return this;
}

continueShopping(): this {
  cy.get(cartLocators.butttonContinueShopping).click();
  cy.url().should("include", "/inventory.html");
  return this;
}

goToCheckout(): this {
  cy.get(cartLocators.buttonCheckout).click();
  cy.url().should("include", "/checkout-step-one.html");
  return this;
}



  }

export default new CartPage();