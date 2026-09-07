import loginLocators from "../locators/login.locators";
import inventoryLocators from "../locators/inventory.locators";

/**
 * LoginPage - Page Object Model.
 * Holds ONLY the actions/behaviours of the login page.
 * No selectors here (they live in /locators) and assertions are limited to
 * the page's own verifications.
 */
class LoginPage {
  /** Open the login page (baseUrl is defined in cypress.config.ts). */
  visit(): this {
    cy.visit("/");
    return this;
  }

  typeUsername(username: string): this {
    if (username) {
      cy.get(loginLocators.usernameInput).clear().type(username);
    }
    return this;
  }

  typePassword(password: string): this {
    if (password) {
      cy.get(loginLocators.passwordInput).clear().type(password, { log: false });
    }
    return this;
  }

  clickLogin(): this {
    cy.get(loginLocators.loginButton).click();
    return this;
  }

  /** High-level reusable action combining the atomic steps. */
  login(username: string, password: string): this {
    this.typeUsername(username);
    this.typePassword(password);
    this.clickLogin();
    return this;
  }

  // ---- Verifications ----

  verifyLoginSuccess(): this {
    cy.url().should("include", "/inventory.html");
    cy.get(inventoryLocators.inventoryContainer).should("be.visible");
    cy.get(inventoryLocators.pageTitle).should("have.text", "Products");
    return this;
  }

  verifyErrorMessage(expectedMessage: string): this {
    cy.get(loginLocators.errorMessage)
      .should("be.visible")
      .and("have.text", expectedMessage);
    return this;
  }

  verifyStillOnLoginPage(): this {
    cy.url().should("eq", "https://www.saucedemo.com/");
    return this;
  }
}

export default new LoginPage();
