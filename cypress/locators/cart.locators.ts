/**
 * Cart page (/cart.html) locators.
 * Only what the cart tests assert on.
 *
 * Note: cart items reuse SauceDemo's `inventory-item-*` data-test attributes,
 * so cart-icon / badge / add / remove selectors are NOT redeclared here — the
 * cart page object reuses the equivalents from inventory.locators.ts.
 */
const cartLocators = {
  // Product name row inside a cart line item (used to assert listed products).
  cartItemName: "[data-test='inventory-item-name']",
  buttonContinueShopping: "[data-test='continue-shopping']",
  buttonCheckout: "[data-test='checkout']",
  removeButton: (slug: string) => `[data-test='remove-${slug}']`,
  productItemDescription: "[data-test='inventory-item-desc']",
  productItemPrice: "[data-test='inventory-item-price']",
} as const;

export default cartLocators;
