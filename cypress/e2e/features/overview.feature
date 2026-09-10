# language: en
Feature: SauceDemo - Information
  As a logged in user
  I want to check Total price

  # Login is done via API/session (cookie) and cached — no UI login here.
  Background:
    Given I am logged in as "standardUser"
    And I am on the inventory page

  @endtoend @overview
  Scenario: 1 - Check price total for one product
    When I add the cheapest product to the cart
    When I open the cart
    And I click on the checkout button
    And I enter "John" as first name, "Doe" as last name, and "6000" as postal code
    And I click Continue
    Then the user should be redirected to the Overview page
    And the selected product should be listed in the cart
   Then the total price should be correct

   @endtoend @overview
  Scenario: 2 - Check price total for multi product
   When I add the following products to the cart:
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
      | Sauce Labs Bolt T-Shirt |
    Then the cart badge should show "3"
    And each added product button should change to "Remove"
    When I open the cart
    Then all added products should be listed in the cart
    And I click on the checkout button
    And I enter "John" as first name, "Doe" as last name, and "6000" as postal code
    And I click Continue
    Then the user should be redirected to the Overview page
    And all added products should be listed in the cart
   Then the total price should be correct

   @endtoend @overview
  Scenario: 3 - Check the redirection vers product
   When I add the following products to the cart:
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
      | Sauce Labs Bolt T-Shirt |
    Then the cart badge should show "3"
    And each added product button should change to "Remove"
    When I open the cart
    Then all added products should be listed in the cart
    And I click on the checkout button
    And I enter "John" as first name, "Doe" as last name, and "6000" as postal code
    And I click Continue
    Then the user should be redirected to the Overview page
    When the user cancel payement
    Then the user should be redirected to the inventory page 
