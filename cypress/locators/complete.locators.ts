import informationLocators from "./information.locators";

/**
 * Order-confirmation page (/checkout-complete.html) locators.
 *
 * The "Finish" button lives on the Overview page and is already declared in
 * information.locators.ts — it is referenced here (one source of truth) instead
 * of being redeclared. Only the confirmation-page selectors are unique here.
 */
const completeLocators = {
  // Shared with the Overview page (same data-test attribute).
  buttonFinish: informationLocators.buttonfinish,
  // Unique to /checkout-complete.html.
  completeHeader: "[data-test='complete-header']",
  completeText: "[data-test='complete-text']",
  buttonBackHome: "[data-test='back-to-products']",
} as const;

export default completeLocators;
