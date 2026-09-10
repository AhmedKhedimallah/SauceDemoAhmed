
import { When ,Then } from "@badeball/cypress-cucumber-preprocessor";
import OverviewPage from "../../pages/overview.pages";
import informationLocators from "cypress/locators/information.locators";

Then("the total price should be correct", () => {
  OverviewPage.verifyTotalPrice();
});

When("the user cancel payement", () => { cy.get(informationLocators.buttonCancel).click(); });

Then("the user should be redirected to the inventory page", () => {
  cy.url().should("include", "/inventory.html");
}); 