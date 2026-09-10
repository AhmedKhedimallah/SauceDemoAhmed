import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import OverviewPage from "../../pages/overview.pages";

Then("the total price should be correct", () => {
  OverviewPage.verifyTotalPrice();
});

When("the user cancel payement", () => {
  OverviewPage.cancelPayment();
});

Then("the user should be redirected to the inventory page", () => {
  cy.url().should("include", "/inventory.html");
});
