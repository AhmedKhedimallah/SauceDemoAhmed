import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import informationPage from "../../pages/information.page";
import { InformationData } from "../types";

// ============================================================
// CHECKOUT
// ============================================================

// Checkout identity resolved by key from the "information" section of the fixture
// (same pattern as login.steps.ts resolving a user by key). The .feature carries
// keys, not literal names/zip codes — one source of truth in information.data.json.
When("I enter the {string} checkout information", (infoKey: string) => {
  cy.fixture<InformationData>("information.data").then(({ information }) => {
    const info = information[infoKey];
    expect(info, `fixture information "${infoKey}"`).to.not.be.undefined;
    informationPage.fillCheckoutInformation(
      info.firstname,
      info.lastname,
      info.zipcode
    );
  });
});

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
