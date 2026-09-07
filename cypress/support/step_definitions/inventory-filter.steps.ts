import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import inventoryPage, { SortOrder } from "../../pages/inventory.page";
import { LoginData } from "../types";

/**
 * Step definitions for the Products sorting/filter feature.
 * Login is programmatic (cy.session + cookie), so scenarios stay independent
 * and fast: the session is created once and reused.
 */

Given("I am logged in as {string}", (userKey: string) => {
  cy.fixture<LoginData>("login.data").then(({ users }) => {
    const user = users[userKey];
    expect(user, `fixture user "${userKey}"`).to.not.be.undefined;
    cy.loginBySession(user.username);
  });
});

Given("I am on the inventory page", () => {
  inventoryPage.visit();
});

When("I sort the products by {string}", (optionLabel: string) => {
  inventoryPage.sortBy(optionLabel);
});

Then("the active sort option should be {string}", (optionLabel: string) => {
  inventoryPage.verifyActiveSortOption(optionLabel);
});

Then(
  "the product names should be sorted in {string} order",
  (order: SortOrder) => {
    inventoryPage.verifyNamesSorted(order);
  }
);

Then(
  "the product prices should be sorted in {string} order",
  (order: SortOrder) => {
    inventoryPage.verifyPricesSorted(order);
  }
);
