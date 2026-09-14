import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import completePage from "../../pages/complete.page";
import { CompleteData } from "../types";

// Thin glue for the order-completion flow (complete.feature). Every step before
// "I click Finish" is reused from the shared cart / information / overview glue;
// only the confirmation-page steps are new. The redirect-to-inventory assertion
// is reused from overview.steps.ts.

// ============================================================
// COMPLETE ORDER
// ============================================================

When("I click Finish", () => {
  completePage.clickFinish();
});

When("I click Back Home", () => {
  completePage.clickBackHome();
});

// Expected texts are resolved from the fixture's messages section by key
// (same pattern as information.steps.ts), so the .feature carries keys.
Then(
  "the order confirmation {string} message should be displayed",
  (messageKey: string) => {
    cy.fixture<CompleteData>("complete.data").then(({ messages }) => {
      const expected = messages[messageKey];
      expect(expected, `fixture message "${messageKey}"`).to.not.be.undefined;
      completePage.verifyOrderCompleteHeader(expected);
    });
  }
);

Then(
  "the order dispatch {string} message should be displayed",
  (messageKey: string) => {
    cy.fixture<CompleteData>("complete.data").then(({ messages }) => {
      const expected = messages[messageKey];
      expect(expected, `fixture message "${messageKey}"`).to.not.be.undefined;
      completePage.verifyOrderDispatchText(expected);
    });
  }
);
