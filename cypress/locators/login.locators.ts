/**
 * Login page locators only.
 * Centralising selectors here keeps the Page Object clean and makes
 * UI changes a single-file update (best practice: separation of concerns).
 */
const loginLocators = {
  usernameInput: "[data-test='username']",
  passwordInput: "[data-test='password']",
  loginButton: "[data-test='login-button']",
  errorMessage: "[data-test='error']",
} as const;

export default loginLocators;
