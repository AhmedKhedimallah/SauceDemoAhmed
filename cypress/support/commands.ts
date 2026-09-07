/// <reference types="cypress" />

/**
 * Programmatic ("API-style") login for SauceDemo.
 *
 * SauceDemo has no real auth backend: the session is a client-side cookie
 * named `session-username`. We set it directly instead of driving the UI,
 * and wrap it in cy.session() so it is created once and cached (across specs).
 * This is the fast, best-practice equivalent of an API login for this app.
 */
Cypress.Commands.add("loginBySession", (username: string) => {
  cy.session(
    username,
    () => {
      cy.visit("/"); // establish the saucedemo domain so the cookie attaches to it
      cy.setCookie("session-username", username);
    },
    {
      validate() {
        cy.getCookie("session-username").should(
          "have.property",
          "value",
          username
        );
      },
      cacheAcrossSpecs: true,
    }
  );
});

export {};
