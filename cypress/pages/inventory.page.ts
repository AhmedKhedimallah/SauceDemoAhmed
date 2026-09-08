import inventoryLocators from "../locators/inventory.locators";

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

  // ---- Verifications ----

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
