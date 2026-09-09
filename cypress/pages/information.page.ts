import informationLocators from "../locators/information.locators";

class InformationPage {
  fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): this {
    cy.get(informationLocators.firstName).type(firstName);
    cy.get(informationLocators.lastName).type(lastName);
    cy.get(informationLocators.postalCode).type(postalCode);
    cy.get(informationLocators.buttonContinue).click();

    return this;
  }
}

export default new InformationPage();