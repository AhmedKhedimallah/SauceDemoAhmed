import overviewLocators from "../locators/overview.locators";

class OverviewPage {

  /**
   * Verify that Item Total equals the sum of all product prices.
   */
  verifyItemTotal(): this {
    let productsTotal = 0;

    cy.get(overviewLocators.cartItemPrice)
      .each(($price) => {
        const price = Number(
          $price.text().replace("$", "").trim()
        );

        productsTotal += price;
      })
      .then(() => {
        cy.get(overviewLocators.itemTotal)
          .invoke("text")
          .then((text) => {
            const itemTotal = Number(
              text.replace("Item total: $", "").trim()
            );

            expect(itemTotal).to.eq(
              Number(productsTotal.toFixed(2))
            );
          });
      });

    return this;
  }

  /**
   * Verify that Tax equals 8% of Item Total.
   */
  verifyTax(): this {
    cy.get(overviewLocators.itemTotal)
      .invoke("text")
      .then((itemTotalText) => {
        const itemTotal = Number(
          itemTotalText.replace("Item total: $", "").trim()
        );

        const expectedTax = Number(
          (itemTotal * 0.08).toFixed(2)
        );

        cy.get(overviewLocators.itemTax)
          .invoke("text")
          .then((taxText) => {
            const actualTax = Number(
              taxText.replace("Tax: $", "").trim()
            );

            expect(actualTax).to.eq(expectedTax);
          });
      });

    return this;
  }

  /**
   * Verify that Total Price equals Item Total + Tax.
   */
  verifyTotalPrice(): this {
    cy.get(overviewLocators.itemTotal)
      .invoke("text")
      .then((itemTotalText) => {
        const itemTotal = Number(
          itemTotalText.replace("Item total: $", "").trim()
        );

        cy.get(overviewLocators.itemTax)
          .invoke("text")
          .then((taxText) => {
            const tax = Number(
              taxText.replace("Tax: $", "").trim()
            );

            const expectedTotal = Number(
              (itemTotal + tax).toFixed(2)
            );

            cy.get(overviewLocators.totalPrice)
              .invoke("text")
              .then((totalText) => {
                const actualTotal = Number(
                  totalText.replace("Total: $", "").trim()
                );

                expect(actualTotal).to.eq(expectedTotal);
              });
          });
      });

    return this;
  }
}

export default new OverviewPage();