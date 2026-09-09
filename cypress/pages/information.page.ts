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
    cy.get(informationLocators.buttonContinue).click();

    return this;
  }

  clickCheckout(): this {
    cy.get(informationLocators.buttonContinue).click();

    return this;
  }
}


export default new InformationPage();