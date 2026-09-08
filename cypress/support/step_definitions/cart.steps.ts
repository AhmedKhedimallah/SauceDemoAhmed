import {
  When,
  Then,
  DataTable,
} from "@badeball/cypress-cucumber-preprocessor";
import inventoryPage from "../../pages/inventory.page";
import cartPage from "../../pages/cart.page";

/**
 * Step definitions for the Cart feature.
 * The "Given I am logged in ..." / "I am on the inventory page" steps are
 * reused from the inventory-filter step definitions (shared glue).
 *
 * Page split:
 *   - Actions happening on /inventory.html (add, badge, Remove button) → InventoryPage.
 *   - Assertions on /cart.html contents → CartPage (to be implemented, see // TODO).
 */

// ---- Inventory-page actions ----

When("I add the cheapest product to the cart", () => {
  inventoryPage.addCheapestProductToCart();
});

When("I add the following products to the cart:", (table: DataTable) => {
  const names = table.raw().map((row) => row[0]);
  inventoryPage.addProducts(names);
});

When("I open the cart", () => {
  inventoryPage.openCart();
});

Then("the cart badge should show {string}", (count: string) => {
  inventoryPage.verifyCartBadge(count);
});

Then("the selected product button should change to {string}", () => {
  inventoryPage.verifySelectedProductRemoveButton();
});

Then("each added product button should change to {string}", () => {
  inventoryPage.verifyAddedProductsRemoveButtons();
});

// ---- Cart-page (/cart.html) assertions ----
// TODO(cart): implement verifySelectedProductInCart() in cart.page.ts (CartPage).
Then("the selected product should be listed in the cart", () => {
  cartPage.verifySelectedProductInCart();
});

// TODO(cart): implement verifyAddedProductsInCart() in cart.page.ts (CartPage).
Then("all added products should be listed in the cart", () => {
  cartPage.verifyAddedProductsInCart();
});
