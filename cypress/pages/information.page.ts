import informationLocators from "../locators/information.locators";

class InformationPage {
  fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): this {
    // Only type non-empty values: cy.type("") throws "cannot accept an empty
    // string". Leaving a field empty is exactly what the required-field negative
    // cases need, so the app's own validation error can be asserted.
    if (firstName) cy.get(informationLocators.firstName).type(firstName);
    if (lastName) cy.get(informationLocators.lastName).type(lastName);
    if (postalCode) cy.get(informationLocators.postalCode).type(postalCode);

    return this;
  }

  clickContinue(): this {
    cy.get(informationLocators.buttonContinue).click();

    return this;
  }

  // ---- Verifications ----

  /** On the checkout "Your Information" page (/checkout-step-one.html). */
  verifyOnInformationPage(): this {
    cy.url().should("include", "/checkout-step-one.html");
    return this;
  }

  /** Advanced to the checkout Overview page (/checkout-step-two.html). */
  verifyOnOverviewPage(): this {
    cy.url().should("include", "/checkout-step-two.html");
    return this;
  }

  verifyFinishButtonVisible(): this {
    cy.get(informationLocators.buttonfinish).should("be.visible");
    return this;
  }

  verifyErrorMessage(expectedMessage: string): this {
    cy.get(informationLocators.errorMessage)
      .should("be.visible")
      .and("have.text", expectedMessage);
    return this;
  }
}

export default new InformationPage();
