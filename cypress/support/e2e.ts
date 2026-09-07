// Global support file loaded before every spec.
import "./commands";

// Keep app-level exceptions from failing the tests (SauceDemo is stable).
Cypress.on("uncaught:exception", () => {
  return true;
});
