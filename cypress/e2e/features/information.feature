# language: en
Feature: SauceDemo - Information
  As a logged in user
  I want to enter my checkout information

  # Login is done via API/session (cookie) and cached — no UI login here.
  Background:
    Given I am logged in as "standardUser"

  @endtoend @information
  Scenario: 1 - Enter valid information
    When I add the cheapest product to the cart
    And I click on the checkout button
    And I enter "John" as first name, "Doe" as last name, and "6000" as postal code
    And I click Continue
    Then the user should be redirected to the Overview page
    And the selected product should be listed in the cart
    And the Finish button should be displayed

  @endtoend @information
  Scenario Outline: 2 - Enter invalid information
    When I add the cheapest product to the cart
    And I click on the checkout button
    And I enter "<firstName>" as first name, "<lastName>" as last name, and "<postalCode>" as postal code
    And I click Continue
    Then the "<errorMessage>" error message should be displayed

    Examples:
      | firstName | lastName | postalCode | errorMessage                  |
      | John      | Doe      |            | Error: Postal Code is required |
      |           | Doe      | 6000       | Error: First Name is required  |
      | John      |          | 6000       | Error: Last Name is required   |