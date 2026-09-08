/**
 * Cart page (/cart.html) locators.
 * Only what the cart tests assert on.
 */
const cartLocators = {
  cartItemName: "[data-test='inventory-item-name']",
  buttonRemove: "[data-test='remove-']",
  buttonCheckout:"[data-test='checkout']",
  buttoncontinueShopping:"[data-test='continue-shopping']",
  iconeshoppingCartLink: "[data-test='shopping-cart-link']",
  iconeshoppingCartBadge: "[data-test='shopping-cart-badge']",
} as const;

export default cartLocators;
