import { Then } from "@badeball/cypress-cucumber-preprocessor";
import inventoryPage from "../../pages/inventory.page";

/**
 * Step definitions for the Inventory visual integrity feature.
 * The "Given I am logged in ..." / "I am on the inventory page" steps are
 * reused from the inventory-filter step definitions (shared glue).
 */

Then("all product images should be identical", () => {
  inventoryPage.verifyAllProductImagesIdentical();
});
