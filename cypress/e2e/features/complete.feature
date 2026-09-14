# language: en
Feature: SauceDemo - Complete
  As a logged in user
  I want to finish my checkout
  So that I get an order confirmation

  # Login is done via API/session (cookie) and cached — no UI login here.
  Background:
    Given I am logged in as "standardUser"
    And I am on the inventory page

  @endtoend @complete
  Scenario: 1 - Complete an order for a single product
    When I add the cheapest product to the cart
    And I open the cart
    And I click on the checkout button
    And I enter the "validInformation" checkout information
    And I click Continue
    Then the user should be redirected to the Overview page
    And the selected product should be listed in the cart
    When I click Finish
    Then the order confirmation "orderComplete" message should be displayed
    And the order dispatch "orderDispatched" message should be displayed

#   @endtoend @complete
#   Scenario: 2 - Return to the products page after completing an order
#    When I add the cheapest product to the cart
#    And I open the cart
#    And I click on the checkout button
#    And I enter the "validInformation" checkout information
#    And I click Continue
#    Then the user should be redirected to the Overview page
#    When I click Finish
#    Then the order confirmation "orderComplete" message should be displayed
#    When I click Back Home
#    Then the user should be redirected to the inventory page
