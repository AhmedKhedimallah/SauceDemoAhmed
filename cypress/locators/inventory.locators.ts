/**
 * Inventory (post-login landing page) locators.
 * Only what the login tests need to assert a successful authentication.
 */
const inventoryLocators = {
  inventoryContainer: "[data-test='inventory-container']",
  pageTitle: ".title",
} as const;

export default inventoryLocators;
