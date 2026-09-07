/**
 * Inventory (post-login) locators.
 * Only the selectors actually used by the tests are declared here
 * (login success assertion + product sorting/filter feature).
 */
const inventoryLocators = {
  // Login success assertion
  inventoryContainer: "[data-test='inventory-container']",
  pageTitle: ".title",

  // Sorting / filter feature
  sortDropdown: "[data-test='product-sort-container']",
  itemName: "[data-test='inventory-item-name']",
  itemPrice: "[data-test='inventory-item-price']",
} as const;

export default inventoryLocators;
