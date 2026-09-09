import {
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

import inventoryPage from "../../pages/inventory.page";
import informationPage from "../../pages/information.page";
import cartPage from "../../pages/cart.page";

// ============================================================
// ADD PRODUCT
// ============================================================

When("I add the cheapest product to the cart", () => {
  inventoryPage.addCheapestProductToCart();
});

// ============================================================
// CHECKOUT
// ============================================================

When("I click on the checkout button", () => {
  cartPage.goToCheckout();
});

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
  informationPage.clickCheckout();
});

// ============================================================
// VALID INFORMATION
// ============================================================

Then("the user should be redirected to the Overview page", () => {
  cy.url().should("include", "/checkout-step-two.html");
});

Then("the selected product should be listed in the cart", () => {
  cy.get<string>("@selectedProduct").then((productName) => {
    cy.contains(productName).should("be.visible");
  });
});

Then("the Finish button should be displayed", () => {
  cy.get("[data-test='finish']").should("be.visible");
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