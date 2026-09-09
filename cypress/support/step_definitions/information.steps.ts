import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import informationPage from "../../pages/information.page";
import { InformationData } from "../types";

// ============================================================
// CHECKOUT
// ============================================================

When(
  "I enter {string} as first name, {string} as last name, and {string} as postal code",
  (firstName: string, lastName: string, postalCode: string) => {
    informationPage.fillCheckoutInformation(firstName, lastName, postalCode);
  }
);

When("I click Continue", () => {
  informationPage.clickContinue();
});

// ============================================================
// VALID INFORMATION
// ============================================================

Then("the user should be redirected to the Overview page", () => {
  informationPage.verifyOnOverviewPage();
});

Then("the Finish button should be displayed", () => {
  informationPage.verifyFinishButtonVisible();
});

// ============================================================
// INVALID INFORMATION
// ============================================================

// The expected text is resolved from the fixture's messages section by its key
// (same pattern as login.steps.ts), so the .feature carries keys, not literals.
Then("the {string} error message should be displayed", (messageKey: string) => {
  cy.fixture<InformationData>("information.data").then(({ messages }) => {
    const expected = messages[messageKey];
    expect(expected, `fixture message "${messageKey}"`).to.not.be.undefined;
    informationPage.verifyErrorMessage(expected);
  });
});
