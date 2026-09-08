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



  }

export default new CartPage();