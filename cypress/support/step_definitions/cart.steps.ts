import {
  When,
  Then,
  DataTable,
} from "@badeball/cypress-cucumber-preprocessor";
import cartPage from "../../pages/cart.page";

/**
 * Step definitions for the Cart feature.
 * The "Given I am logged in ..." / "I am on the inventory page" steps are
 * reused from the inventory-filter step definitions (shared glue).
 */

When("I add the cheapest product to the cart", () => {
  cartPage.addCheapestProductToCart();
});

When("I add the following products to the cart:", (table: DataTable) => {
  const names = table.raw().map((row) => row[0]);
  cartPage.addProducts(names);
});

When("I open the cart", () => {
  cartPage.openCart();
});

Then("the cart badge should show {string}", (count: string) => {
  cartPage.verifyCartBadge(count);
});

Then("the selected product button should change to {string}", () => {
  cartPage.verifySelectedProductRemoveButton();
});

Then("each added product button should change to {string}", () => {
  cartPage.verifyAddedProductsRemoveButtons();
});

Then("the selected product should be listed in the cart", () => {
  cartPage.verifySelectedProductInCart();
});

Then("all added products should be listed in the cart", () => {
  cartPage.verifyAddedProductsInCart();
});
