/**
 * Inventory (post-login) locators.
 * Only the selectors actually used by the tests are declared here
 * (login success assertion + product sorting/filter + cart actions).
 */
const inventoryLocators = {
  // Login success assertion
  inventoryContainer: "[data-test='inventory-container']",
  pageTitle: "[data-test='title']",

  // Sorting / filter feature
  sortDropdown: "[data-test='product-sort-container']",
  selectedOption: "option:selected",
  itemName: "[data-test='inventory-item-name']",
  itemPrice: "[data-test='inventory-item-price']",
  // Every product image: data-test ends with "-img" (e.g. inventory-item-<slug>-img)
  itemImage: "[data-test$='-img']",

  // Cart actions (add/remove buttons are per-product, built from the name slug)
  cartIcon: "[data-test='shopping-cart-link']",
  cartBadge: "[data-test='shopping-cart-badge']",
  addToCartButton: (slug: string) => `[data-test='add-to-cart-${slug}']`,
  removeButton: (slug: string) => `[data-test='remove-${slug}']`,
} as const;

export default inventoryLocators;
