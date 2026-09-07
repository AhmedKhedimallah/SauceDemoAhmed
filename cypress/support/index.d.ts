/// <reference types="cypress" />

// Type augmentation for the project's custom Cypress commands.
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Programmatic login via the SauceDemo session cookie, cached with cy.session.
       * @param username a valid SauceDemo username (e.g. "standard_user")
       */
      loginBySession(username: string): Chainable<void>;
    }
  }
}

export {};
