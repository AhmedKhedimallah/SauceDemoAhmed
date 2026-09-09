import inventoryLocators from "./inventory.locators";

/**
 * Cart page (/cart.html) locators.
 *
 * Cart line items reuse SauceDemo's `inventory-item-*` data-test attributes, so
 * the shared selectors (name / price / description / remove) are referenced from
 * inventory.locators.ts instead of being redeclared — one source of truth, no drift.
 * Only the selectors unique to the cart page are defined here.
 */
const cartLocators = {
  // Shared with the inventory page (same data-test attributes).
  cartItemName: inventoryLocators.itemName,
  productItemPrice: inventoryLocators.itemPrice,
  productItemDescription: inventoryLocators.itemDescription,
  removeButton: inventoryLocators.removeButton,

  // Unique to the cart page.
  buttonContinueShopping: "[data-test='continue-shopping']",
  buttonCheckout: "[data-test='checkout']",
} as const;

export default cartLocators;
