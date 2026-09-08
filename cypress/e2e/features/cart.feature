# language: en
Feature: SauceDemo - Cart
  As a logged in user
  I want to add products to my cart
  So that I can purchase them later

  # Login is done via API/session (cookie) and cached — no UI login here.
  Background:
    Given I am logged in as "standardUser"
    And I am on the inventory page

  @endtoend @cart
  Scenario: Add the cheapest product to the cart
    When I add the cheapest product to the cart
    Then the cart badge should show "1"
    And the selected product button should change to "Remove"
    When I open the cart
    Then the selected product should be listed in the cart

  @cart
  Scenario: Add multiple products to the cart
    When I add the following products to the cart:
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
      | Sauce Labs Bolt T-Shirt |
    Then the cart badge should show "3"
    And each added product button should change to "Remove"
    When I open the cart
    Then all added products should be listed in the cart

    @cart
Scenario 4: Redirect to the checkout information page

  When I add the following products to the cart:
    | Sauce Labs Backpack   |
    | Sauce Labs Bike Light |
    | Sauce Labs Bolt T-Shirt |
  Then the cart badge should show "3"
  When I open the cart
  And I click the "Checkout" button
  Then the checkout information page should be displayed
  Then the cart badge should show "3"


