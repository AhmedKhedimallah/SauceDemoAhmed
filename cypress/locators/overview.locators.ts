import inventoryLocators from "./inventory.locators";

/**
 * Cart page (/cart.html) locators.
 *
 * Cart line items reuse SauceDemo's `inventory-item-*` data-test attributes, so
 * the shared selectors (name / price / description / remove) are referenced from
 * inventory.locators.ts instead of being redeclared — one source of truth, no drift.
 * Only the selectors unique to the cart page are defined here.
 */
const overviewLocators = {
  // Shared with the inventory page (same data-test attributes).
  cartItemName: inventoryLocators.itemName,
  cartItemPrice: inventoryLocators.itemPrice,
  itemTotal : "[data-test='subtotal-label']",
  itemTax : "[data-test='tax-label']",
  totalPrice : "[data-test='total-label']",
  
 
} as const;

export default overviewLocators;