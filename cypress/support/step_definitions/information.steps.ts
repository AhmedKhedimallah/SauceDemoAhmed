import {
When,
Then,
} from "@badeball/cypress-cucumber-preprocessor";

import inventoryPage from "../../pages/inventory.page";  
import informationPage from "../../pages/information.page";

// ============================================================
// ADD PRODUCT
// ============================================================

When("I add the cheapest product to the cart", () => {
inventoryPage.addCheapestProductToCart();
});

// ============================================================
// CHECKOUT INFORMATION
// ============================================================

When("I open the information", () => {
informationPage.clickCheckout();
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

// ============================================================
// VALID INFORMATION
// ============================================================

Then("the user should be redirected to the Overview page", () => {
cy.url().should("include", "/checkout-step-two.html");
});

Then("the selected product should be listed in the cart", () => {
// Use your existing cart/product assertion here.
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
