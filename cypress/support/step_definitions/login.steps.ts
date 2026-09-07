import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "../../pages/login.page";
import { LoginData } from "../types";

/**
 * Step definitions for the Login feature.
 * Each test is INDEPENDENT: the Background re-opens the login page before
 * every scenario, so no scenario relies on the state left by another.
 * Test data lives in a single per-feature fixture: login.data.json
 * (internal sections: users / messages).
 */

Given("I am on the login page", () => {
  loginPage.visit();
});

// Data-driven login using a named account from the users section.
When("I login with the {string} account", (userKey: string) => {
  cy.fixture<LoginData>("login.data").then(({ users }) => {
    const user = users[userKey];
    expect(user, `fixture user "${userKey}"`).to.not.be.undefined;
    loginPage.login(user.username, user.password);
  });
});

// Explicit credentials (used for empty-field and ad-hoc combinations).
When(
  "I enter the username {string} and the password {string}",
  (username: string, password: string) => {
    loginPage.typeUsername(username);
    loginPage.typePassword(password);
  }
);

When("I click the login button", () => {
  loginPage.clickLogin();
});

Then("I should be redirected to the inventory page", () => {
  loginPage.verifyLoginSuccess();
});

// The expected message is resolved from the messages section by its key.
Then("I should see the error message {string}", (messageKey: string) => {
  cy.fixture<LoginData>("login.data").then(({ messages }) => {
    const expected = messages[messageKey];
    expect(expected, `fixture message "${messageKey}"`).to.not.be.undefined;
    loginPage.verifyErrorMessage(expected);
    loginPage.verifyStillOnLoginPage();
  });
});
