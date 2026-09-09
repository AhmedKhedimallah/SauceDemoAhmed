import {
  When,
  Then,
  DataTable,
} from "@badeball/cypress-cucumber-preprocessor";
import inventoryPage from "../../pages/inventory.page";
import cartPage from "../../pages/cart.page"; 
import inventoryLocators from "../../locators/inventory.locators";
import informationPage from "../../pages/information.page";
import informationLocators from "../../locators/information.locators";


// ============================================================
// ADD PRODUCT
// ============================================================


// ============================================================
// CHECKOUT
// ============================================================



When(
  "I enter {string} as first name, {string} as last name, and {string} as postal code",
  (firstName: string, lastName: string, postalCode: string) => {
    informationPage.fillCheckoutInformation(
      firstName,
      lastName,
      postalCode
    );
  }
);

When("I click Continue", () => {
  informationPage.clickContinue;
});

// ============================================================
// VALID INFORMATION
// ============================================================

Then("the user should be redirected to the Overview page", () => {
  cy.url().should("include", "/checkout-step-two.html");
});



Then("the Finish button should be displayed", () => {
  cy.get(informationLocators.buttonfinish).should("be.visible");
});

// ============================================================
// INVALID INFORMATION
// ============================================================

Then(
  "the {string} error message should be displayed",
  (errorMessage: string) => {
    cy.contains(errorMessage).should("be.visible");
  }
);