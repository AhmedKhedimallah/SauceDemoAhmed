import cartLocators from "../locators/cart.locators";

/**
 * CartPage - Page Object Model for the cart page (/cart.html) ONLY.
 *
 * The inventory-side actions (add to cart, cart badge, product "Remove" button)
 * now live in inventory.page.ts, since they happen on /inventory.html.
 *
 * This class is intentionally an empty skeleton: add here ONLY the behaviours
 * that operate on the /cart.html page itself, e.g. verifying that the product(s)
 * carried via the @selectedProduct / @addedProducts aliases are listed in the
 * cart. The line-item name selector is available as `cartLocators.cartItemName`.
 *
 * Steps currently expecting methods here (see cart.steps.ts, marked // TODO):
 *   - verifySelectedProductInCart()
 *   - verifyAddedProductsInCart()
 */
class CartPage {
  // Reference kept so the import is available when you start adding methods.
  protected readonly locators = cartLocators;
}

export default new CartPage();
