import cartLocators from "../locators/cart.locators";
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



  }

export default new CartPage();