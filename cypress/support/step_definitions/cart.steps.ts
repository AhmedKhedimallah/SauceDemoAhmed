import {
  When,
  Then,
  DataTable,
} from "@badeball/cypress-cucumber-preprocessor";
import inventoryPage from "../../pages/inventory.page";
import cartPage from "../../pages/cart.page"; 
import inventoryLocators from "../../locators/inventory.locators";

/**
 * Step definitions for the Cart feature (cart.feature).
 *
 * The "Given I am logged in ..." / "I am on the inventory page" steps are
 * reused from the inventory-filter step definitions (shared glue).
 *
 * Page split:
 *   - Actions on /inventory.html (add product, cart badge, "Remove" button) → InventoryPage.
 *   - Assertions on /cart.html contents (product listed) → CartPage.
 *
 * Scenario → step flow (which steps below each scenario exercises):
 *
 *   Scenario 1 — "Add the cheapest product to the cart" (@endtoend @cart)
 *     When  I add the cheapest product to the cart
 *     Then  the cart badge should show "1"
 *     And   the selected product button should change to "Remove"
 *     When  I open the cart
 *     Then  the selected product should be listed in the cart
 *
 *   Scenario 2 — "Add multiple products to the cart" (@cart)
 *     When  I add the following products to the cart: <DataTable>
 *     Then  the cart badge should show "3"
 *     And   each added product button should change to "Remove"
 *     When  I open the cart
 *     Then  all added products should be listed in the cart
 *
 * Steps marked "shared" are used by BOTH scenarios.
 */

// ============================================================
// Actions performed on the inventory page (/inventory.html)
// ============================================================

// Scenario 1 — pick the lowest-priced product, add it, and remember it (@selectedProduct).
When("I add the cheapest product to the cart", () => {
  inventoryPage.addCheapestProductToCart();
});

// Scenario 2 — add each product named in the DataTable and remember them (@addedProducts).
When("I add the following products to the cart:", (table: DataTable) => {
  const names = table.raw().map((row) => row[0]);
  inventoryPage.addProducts(names);
});

// Shared (Scenario 1 & 2) — click the header cart icon to navigate to /cart.html.
When("I open the cart", () => {
  inventoryPage.openCart();
});

// Shared (Scenario 1 & 2) — assert the cart badge count ("1" for scenario 1, "3" for scenario 2).
Then("the cart badge should show {string}", (count: string) => {
  inventoryPage.verifyCartBadge(count);
});

// Scenario 1 — the single added product's button must now read "Remove".
Then("the selected product button should change to {string}", () => {
  inventoryPage.verifySelectedProductRemoveButton();
});

// Scenario 2 — every added product's button must now read "Remove".
Then("each added product button should change to {string}", () => {
  inventoryPage.verifyAddedProductsRemoveButtons();
});

// ============================================================
// Assertions on the cart page (/cart.html)
// ============================================================

// Scenario 1 — the remembered product (@selectedProduct) is listed in the cart.
Then("the selected product should be listed in the cart", () => {
  cartPage.verifySelectedProductInCart();
});

// Scenario 2 — all remembered products (@addedProducts) are listed in the cart.
Then("all added products should be listed in the cart", () => {
  cartPage.verifyAddedProductsInCart();
});

//  Scenario 3: Remove product to the cart

When("I remove the selected product from the cart", () => {
  cartPage.removeSelectedProduct();
});

Then("the cart badge should decrease by 1", () => {
  cy.get(inventoryLocators.cartBadge).should("not.exist");
});

// Scenario 3 — after removal, the product must no longer appear in the cart.
Then("the selected product should no longer be displayed in the cart", () => {
  cartPage.verifySelectedProductNotInCart();
});
//Scenario 4: Redirect to the checkout information page
When("I click on the checkout button", () => {
  cartPage.goToCheckout();
});

Then("the checkout information page should be displayed", () => {
  cy.url().should("include", "/checkout-step-one.html");
});


