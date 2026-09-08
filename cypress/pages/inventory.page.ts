import inventoryLocators from "../locators/inventory.locators";
import { slugify } from "../support/utils";

export type SortOrder = "ascending" | "descending";

/**
 * InventoryPage - Page Object Model for the products (inventory) page.
 * Holds ONLY the page behaviours; selectors live in /locators.
 */
class InventoryPage {
  /**
   * Open the inventory page directly (session already established via cookie).
   * SauceDemo is a SPA: the server answers /inventory.html with a 404 status
   * but serves the full app HTML, so we disable failOnStatusCode.
   */
  visit(): this {
    cy.visit("/inventory.html", { failOnStatusCode: false });
    cy.get(inventoryLocators.inventoryContainer).should("be.visible");
    return this;
  }

  /** Select a sort option by its visible label (e.g. "Name (Z to A)"). */
  sortBy(optionLabel: string): this {
    cy.get(inventoryLocators.sortDropdown).select(optionLabel);
    return this;
  }

 // ---- Cart actions (performed on the inventory page) ----

/**
 * Find the cheapest product on the inventory page, add it to the cart,
 * and remember its name, price, and description via Cypress aliases
 * for later assertions.
 */
addCheapestProductToCart(): this {
  cy.get(inventoryLocators.itemName).then(($names) => {
    cy.get(inventoryLocators.itemPrice).then(($prices) => {
      cy.get(inventoryLocators.ProductItemDescription).then(($descriptions) => {
        const items = [...$names].map((el, i) => ({
          name: el.innerText.trim(),
          price: parseFloat(
            $prices[i].innerText.replace("$", "").trim()
          ),
          description: $descriptions[i].innerText.trim(),
        }));

        const cheapest = items.reduce((a, b) =>
          b.price < a.price ? b : a
        );

        // Store product information for later assertions
        cy.wrap(cheapest.name).as("selectedProduct");
        cy.wrap(cheapest.price.toFixed(2)).as("selectedProductPrice");
        cy.wrap(cheapest.description).as("selectedProductDescription");

        // Add the cheapest product to the cart
        cy.get(
          inventoryLocators.addToCartButton(slugify(cheapest.name))
        ).click();
      });
    });
  });

  return this;
}
  /** Add a fixed list of products by name and remember them via @addedProducts. */
  addProducts(names: string[]): this {
    cy.wrap(names).as("addedProducts");
    names.forEach((name) => {
      cy.get(inventoryLocators.addToCartButton(slugify(name))).click();
    });
    return this;
  }

  /** Open the cart from the header icon (navigates to /cart.html). */
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

  /** The single selected product's button must now read "Remove". */
  verifySelectedProductRemoveButton(): this {
    cy.get<string>("@selectedProduct").then((name) => {
      cy.get(inventoryLocators.removeButton(slugify(name))).should("be.visible");
    });
    return this;
  }

  /** Every added product's button must now read "Remove". */
  verifyAddedProductsRemoveButtons(): this {
    cy.get<string[]>("@addedProducts").then((names) => {
      names.forEach((name) => {
        cy.get(inventoryLocators.removeButton(slugify(name))).should("be.visible");
      });
    });
    return this;
  }

  /** Currently selected sort option (visible text). */
  verifyActiveSortOption(expectedLabel: string): this {
    cy.get(inventoryLocators.sortDropdown)
      .find(inventoryLocators.selectedOption)
      .should("have.text", expectedLabel);
    return this;
  }

  /** Product names must be in alphabetical asc/desc order. */
  verifyNamesSorted(order: SortOrder): this {
    cy.get(inventoryLocators.itemName).then(($els) => {
      const names = [...$els].map((el) => el.innerText.trim());
      const expected = [...names].sort((a, b) => a.localeCompare(b));
      if (order === "descending") expected.reverse();
      expect(names, `names sorted ${order}`).to.deep.equal(expected);
    });
    return this;
  }

  /** Product prices must be in numeric asc/desc order. */
  verifyPricesSorted(order: SortOrder): this {
    cy.get(inventoryLocators.itemPrice).then(($els) => {
      const prices = [...$els].map((el) =>
        parseFloat(el.innerText.replace("$", "").trim())
      );
      const expected = [...prices].sort((a, b) => a - b);
      if (order === "descending") expected.reverse();
      expect(prices, `prices sorted ${order}`).to.deep.equal(expected);
    });
    return this;
  }

  /**
   * Known problem_user defect: every product shows the same broken image.
   * Asserts all product images share a single src (a standard user has one
   * distinct image per product).
   */
  verifyAllProductImagesIdentical(): this {
    cy.get(inventoryLocators.itemImage).then(($imgs) => {
      const srcs = [...$imgs].map((el) => el.getAttribute("src"));
      expect(srcs.length, "product images present").to.be.greaterThan(1);
      expect(
        new Set(srcs).size,
        "all product images share the same src (problem_user defect)"
      ).to.equal(1);
    });
    return this;
  }
}

export default new InventoryPage();
