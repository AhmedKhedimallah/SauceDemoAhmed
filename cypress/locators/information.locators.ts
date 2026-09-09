const informationLocators = {
  // Checkout "Your Information" form fields (/checkout-step-one.html).
  firstName: "[data-test='firstName']",
  lastName : "[data-test='lastName']",
  postalCode : "[data-test='postalCode']",
  buttonContinue :"[data-test='continue']",
  buttonCancel : "[data-test='cancel']",
  buttonfinish : "[data-test='finish']",
  // Required-field validation error (same data-test as the login error).
  errorMessage: "[data-test='error']",
} as const;

export default informationLocators;