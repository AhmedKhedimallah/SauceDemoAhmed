import inventoryLocators from "../locators/inventory.locators";
import cartLocators from "../locators/cart.locators";

/** Convert a product name to the data-test slug, e.g. "Sauce Labs Onesie" -> "sauce-labs-onesie". */
const slugify = (name: string): string => name.toLowerCase().replace(/\s+/g, "-");

/**
 * CartPage - Page Object Model for cart actions.
 * The selected product name(s) are carried between steps through Cypress
 * aliases (@selectedProduct / @addedProducts) so each step stays stateless.
 */
class CartPage {
  /** Find the cheapest product on the page, add it, and remember its name. */
  addCheapestProductToCart(): this {
    cy.get(inventoryLocators.itemName).then(($names) => {
      cy.get(inventoryLocators.itemPrice).then(($prices) => {
        const items = [...$names].map((el, i) => ({
          name: el.innerText.trim(),
          price: parseFloat($prices[i].innerText.replace("$", "").trim()),
        }));
        const cheapest = items.reduce((a, b) => (b.price < a.price ? b : a));
        cy.wrap(cheapest.name).as("selectedProduct");
        cy.get(inventoryLocators.addToCartButton(slugify(cheapest.name))).click();
      });
    });
    return this;
  }

  /** Add a fixed list of products and remember them. */
  addProducts(names: string[]): this {
    cy.wrap(names).as("addedProducts");
    names.forEach((name) => {
      cy.get(inventoryLocators.addToCartButton(slugify(name))).click();
    });
    return this;
  }

  openCart(): this {
    cy.get(inventoryLocators.cartIcon).click();
    cy.url().should("include", "/cart.html");
    return this;
  }

  // ---- Verifications ----

  verifyCartBadge(count: string): this {
    cy.get(inventoryLocators.cartBadge).should("have.text", count);
    return this;
  }

  /** The single selected product's button must now be "Remove". */
  verifySelectedProductRemoveButton(): this {
    cy.get<string>("@selectedProduct").then((name) => {
      cy.get(inventoryLocators.removeButton(slugify(name))).should("be.visible");
    });
    return this;
  }

  /** Every added product's button must now be "Remove". */
  verifyAddedProductsRemoveButtons(): this {
    cy.get<string[]>("@addedProducts").then((names) => {
      names.forEach((name) => {
        cy.get(inventoryLocators.removeButton(slugify(name))).should("be.visible");
      });
    });
    return this;
  }

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
