import completeLocators from "../locators/complete.locators";

class CompletePage {
  /** Confirm the order from the Overview page (→ /checkout-complete.html). */
  clickFinish(): this {
    cy.get(completeLocators.buttonFinish).click();
    return this;
  }

  /** Return to the inventory from the confirmation page. */
  clickBackHome(): this {
    cy.get(completeLocators.buttonBackHome).click();
    return this;
  }

  verifyOrderCompleteHeader(expectedMessage: string): this {
    cy.get(completeLocators.completeHeader)
      .should("be.visible")
      .and("have.text", expectedMessage);
    return this;
  }

  verifyOrderDispatchText(expectedMessage: string): this {
    cy.get(completeLocators.completeText)
      .should("be.visible")
      .and("have.text", expectedMessage);
    return this;
  }
}

export default new CompletePage();
